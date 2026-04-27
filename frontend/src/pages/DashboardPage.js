import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import dsaTopics from '../data/dsaData';

const difficultyColors = { Easy: 'var(--easy)', Medium: 'var(--medium)', Hard: 'var(--hard)' };

function StatCard({ icon, label, value, color }) {
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 16, padding: '20px 24px',
      display: 'flex', alignItems: 'center', gap: 16
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: `${color}20`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 700, color }}>{value}</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}

function TopicCard({ topic }) {
  const { getTopicProgress } = useProgress();
  const prog = getTopicProgress(topic);

  // Count difficulties
  const counts = { Easy: 0, Medium: 0, Hard: 0 };
  topic.subtopics?.forEach(s => s.problems?.forEach(p => counts[p.difficulty]++));

  return (
    <Link to={`/topic/${topic.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 16, padding: 24, cursor: 'pointer',
        transition: 'all 0.25s ease',
        position: 'relative', overflow: 'hidden'
      }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = topic.color;
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = `0 8px 32px ${topic.color}20`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Top accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${topic.color}, transparent)`,
          opacity: prog.pct > 0 ? 1 : 0, transition: 'opacity 0.3s'
        }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: `${topic.color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
            }}>{topic.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{topic.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                {topic.subtopics?.length} subtopics
              </div>
            </div>
          </div>
          <div style={{
            fontSize: 20, fontWeight: 800, color: prog.pct === 100 ? 'var(--easy)' : topic.color
          }}>
            {prog.pct}%
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ background: 'var(--bg-primary)', borderRadius: 99, height: 6, marginBottom: 16 }}>
          <div style={{
            height: '100%', borderRadius: 99,
            background: prog.pct === 100
              ? 'linear-gradient(90deg, var(--easy), #16a34a)'
              : `linear-gradient(90deg, ${topic.color}, ${topic.color}99)`,
            width: `${prog.pct}%`, transition: 'width 0.5s ease'
          }} />
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {Object.entries(counts).map(([diff, cnt]) => cnt > 0 && (
              <span key={diff} style={{
                fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 20,
                background: `var(--${diff.toLowerCase()}-bg)`,
                color: `var(--${diff.toLowerCase()})`
              }}>{cnt} {diff}</span>
            ))}
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            {prog.done}/{prog.total}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { getTotalProgress } = useProgress();
  const [filter, setFilter] = useState('All');

  const total = getTotalProgress(dsaTopics);

  const diffStats = { Easy: 0, Medium: 0, Hard: 0 };
  dsaTopics.forEach(t => t.subtopics?.forEach(s => s.problems?.forEach(p => diffStats[p.difficulty]++)));

  const topics = filter === 'All' ? dsaTopics : dsaTopics.filter(t => {
    const counts = { Easy: 0, Medium: 0, Hard: 0 };
    t.subtopics?.forEach(s => s.problems?.forEach(p => counts[p.difficulty]++));
    return counts[filter] > 0;
  });

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'},{' '}
          <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {user?.name?.split(' ')[0]}
          </span> 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
          Keep going — you're {total.pct}% through your DSA journey.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
        <StatCard icon="✅" label="Problems Solved" value={total.done} color="var(--accent)" />
        <StatCard icon="📊" label="Total Progress" value={`${total.pct}%`} color="#8b5cf6" />
        <StatCard icon="🟢" label="Easy Problems" value={diffStats.Easy} color="var(--easy)" />
        <StatCard icon="🟡" label="Medium Problems" value={diffStats.Medium} color="var(--medium)" />
        <StatCard icon="🔴" label="Hard Problems" value={diffStats.Hard} color="var(--hard)" />
      </div>

      {/* Overall Progress Bar */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 16, padding: '20px 24px', marginBottom: 32
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontWeight: 600 }}>Overall Progress</span>
          <span style={{ color: 'var(--text-muted)' }}>{total.done} / {total.total} problems</span>
        </div>
        <div style={{ background: 'var(--bg-primary)', borderRadius: 99, height: 12, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 99,
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)',
            width: `${total.pct}%`, transition: 'width 0.8s ease',
            boxShadow: '0 0 20px rgba(99,102,241,0.5)'
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {dsaTopics.length} Topics
          </span>
          <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>
            {total.pct}% Complete
          </span>
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {['All', 'Easy', 'Medium', 'Hard'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '7px 16px', borderRadius: 99, fontSize: 13, fontWeight: 600,
              background: filter === f
                ? (f === 'Easy' ? 'var(--easy)' : f === 'Medium' ? 'var(--medium)' : f === 'Hard' ? 'var(--hard)' : 'var(--accent)')
                : 'var(--bg-secondary)',
              color: filter === f ? '#fff' : 'var(--text-secondary)',
              border: '1px solid var(--border)',
              transition: 'all 0.2s'
            }}
          >{f}</button>
        ))}
      </div>

      {/* Topic Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {topics.map(topic => (
          <TopicCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </div>
  );
}
