import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API } from './AuthContext';
import { useAuth } from './AuthContext';

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const [completedProblems, setCompletedProblems] = useState({});
  const [loading, setLoading] = useState(false);

  // Load progress when user logs in
  useEffect(() => {
    if (user) {
      setLoading(true);
      API.get('/progress')
        .then(res => setCompletedProblems(res.data.completedProblems || {}))
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setCompletedProblems({});
    }
  }, [user]);

  const toggleProblem = useCallback(async (problemId) => {
    // Optimistic update
    setCompletedProblems(prev => ({
      ...prev,
      [problemId]: !prev[problemId]
    }));
    try {
      const res = await API.post('/progress/toggle', { problemId });
      setCompletedProblems(res.data.completedProblems);
    } catch (err) {
      // Revert on error
      setCompletedProblems(prev => ({
        ...prev,
        [problemId]: !prev[problemId]
      }));
    }
  }, []);

  const isCompleted = useCallback((problemId) => !!completedProblems[problemId], [completedProblems]);

  const getTopicProgress = useCallback((topic) => {
    let total = 0, done = 0;
    topic.subtopics?.forEach(sub => {
      sub.problems?.forEach(p => {
        total++;
        if (completedProblems[`${topic._id}_${p._id}`]) done++;
      });
    });
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [completedProblems]);

  const getTotalProgress = useCallback((topics) => {
    let total = 0, done = 0;
    topics.forEach(topic => {
      const p = getTopicProgress(topic);
      total += p.total;
      done += p.done;
    });
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [getTopicProgress]);

  return (
    <ProgressContext.Provider value={{ completedProblems, loading, toggleProblem, isCompleted, getTopicProgress, getTotalProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
