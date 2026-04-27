import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import dsaTopics from '../data/dsaData';

const DIFF_STYLE = {
  Easy: { color: 'var(--easy)', bg: 'var(--easy-bg)' },
  Medium: { color: 'var(--medium)', bg: 'var(--medium-bg)' },
  Hard: { color: 'var(--hard)', bg: 'var(--hard-bg)' },
};

function ResourceLink({ href, icon, label }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 500,
        background: 'var(--bg-primary)', border: '1px solid var(--border)',
        color: 'var(--text-secondary)', transition: 'all 0.2s', textDecoration: 'none'
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
    >
      <span>{icon}</span> {label}
    </a>
  );
}

function ProblemRow({ problem, problemId, index }) {
  const { isCompleted, toggleProblem } = useProgress();
  const done = isCompleted(problemId);
  const diff = DIFF_STYLE[problem.difficulty];

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px',
      borderBottom: '1px solid var(--border)',
      background: done ? 'rgba(34,197,94,0.03)' : 'transparent',
      transition: 'background 0.2s',
      opacity: done ? 0.75 : 1
    }}>
      {/* Checkbox */}
      <button
        onClick={() => toggleProblem(problemId)}
        style={{
          width: 24, height: 24, borderRadius: 7, flexShrink: 0,
          border: done ? 'none' : '2px solid var(--border-light)',
          background: done ? 'var(--easy)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s', cursor: 'pointer'
        }}
      >
        {done && <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>✓</span>}
      </button>

      {/* Index */}
      <span style={{ fontSize: 13, color: 'var(--text-muted)', width: 28, flexShrink: 0, fontFamily: 'var(--mono)' }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Title */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          fontWeight: 500, fontSize: 15,
          textDecoration: done ? 'line-through' : 'none',
          color: done ? 'var(--text-muted)' : 'var(--text-primary)'
        }}>
          {problem.title}
        </span>
      </div>

      {/* Difficulty badge */}
      <span style={{
        fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20, flexShrink: 0,
        background: diff.bg, color: diff.color
      }}>
        {problem.difficulty}
      </span>

      {/* Resource links */}
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        <ResourceLink href={problem.youtubeLink} icon="▶" label="Video" />
        <ResourceLink href={problem.leetcodeLink} icon="💻" label="Practice" />
        <ResourceLink href={problem.articleLink} icon="📄" label="Article" />
      </div>
    </div>
  );
}

function SubtopicSection({ subtopic, topicSlug, topicId, subtopicIdx }) {
  const [collapsed, setCollapsed] = useState(false);
  const { isCompleted } = useProgress();

  const total = subtopic.problems?.length || 0;
  const done = subtopic.problems?.filter(p =>
    isCompleted(`${topicId}_${subtopicIdx}_${p._id || p.title}`)
  ).length || 0;

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 16, marginBottom: 16, overflow: 'hidden'
    }}>
      {/* Subtopic header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', background: 'transparent', cursor: 'pointer',
          color: 'var(--text-primary)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 700 }}>{subtopic.title}</span>
          <span style={{
            fontSize: 12, color: done === total && total > 0 ? 'var(--easy)' : 'var(--text-muted)',
            background: done === total && total > 0 ? 'var(--easy-bg)' : 'var(--bg-primary)',
            padding: '2px 8px', borderRadius: 20
          }}>
            {done}/{total}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Mini progress */}
          <div style={{ width: 80, height: 4, background: 'var(--bg-primary)', borderRadius: 99 }}>
            <div style={{
              height: '100%', borderRadius: 99,
              background: done === total && total > 0 ? 'var(--easy)' : 'var(--accent)',
              width: `${total ? (done / total) * 100 : 0}%`, transition: 'width 0.4s'
            }} />
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: 18, transform: collapsed ? 'rotate(-90deg)' : 'none', transition: 'transform 0.2s' }}>
            ⌄
          </span>
        </div>
      </button>

      {/* Problems */}
      {!collapsed && (
        <div>
          {subtopic.problems?.map((problem, pIdx) => (
            <ProblemRow
              key={problem._id || problem.title}
              problem={problem}
              index={pIdx}
              problemId={`${topicId}_${subtopicIdx}_${problem._id || problem.title}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TopicPage() {
  const { slug } = useParams();
  const { getTopicProgress } = useProgress();
  const [diffFilter, setDiffFilter] = useState('All');

  const topic = dsaTopics.find(t => t.slug === slug);

  if (!topic) return (
    <div style={{ textAlign: 'center', paddingTop: 80 }}>
      <div style={{ fontSize: 48 }}>😕</div>
      <h2 style={{ marginTop: 16 }}>Topic not found</h2>
      <Link to="/dashboard" style={{ color: 'var(--accent)', marginTop: 16, display: 'inline-block' }}>← Back to Dashboard</Link>
    </div>
  );

  const prog = getTopicProgress(topic);
  const topicId = topic.slug;

  const filteredTopic = diffFilter === 'All' ? topic : {
    ...topic,
    subtopics: topic.subtopics?.map(sub => ({
      ...sub,
      problems: sub.problems?.filter(p => p.difficulty === diffFilter)
    })).filter(sub => sub.problems?.length > 0)
  };

  return (
    <div className="fade-in">
      {/* Breadcrumb */}
      <div style={{ marginBottom: 24 }}>
        <Link to="/dashboard" style={{ color: 'var(--text-muted)', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          ← Dashboard
        </Link>
      </div>

      {/* Topic header */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 20, padding: 32, marginBottom: 28,
        backgroundImage: `radial-gradient(ellipse at 100% 50%, ${topic.color}15 0%, transparent 60%)`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 16, fontSize: 30,
            background: `${topic.color}20`,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>{topic.icon}</div>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800 }}>{topic.title}</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>{topic.description}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ flex: 1, background: 'var(--bg-primary)', borderRadius: 99, height: 10 }}>
            <div style={{
              height: '100%', borderRadius: 99, transition: 'width 0.6s',
              background: prog.pct === 100 ? 'var(--easy)' : `linear-gradient(90deg, ${topic.color}, ${topic.color}99)`,
              width: `${prog.pct}%`
            }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 18, color: topic.color, minWidth: 52 }}>
            {prog.pct}%
          </span>
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 12 }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{prog.done} solved</span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{prog.total - prog.done} remaining</span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{topic.subtopics?.length} subtopics</span>
        </div>
      </div>

      {/* Difficulty filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['All', 'Easy', 'Medium', 'Hard'].map(d => (
          <button
            key={d}
            onClick={() => setDiffFilter(d)}
            style={{
              padding: '6px 14px', borderRadius: 99, fontSize: 13, fontWeight: 600,
              background: diffFilter === d
                ? (d === 'Easy' ? 'var(--easy)' : d === 'Medium' ? 'var(--medium)' : d === 'Hard' ? 'var(--hard)' : 'var(--accent)')
                : 'var(--bg-secondary)',
              color: diffFilter === d ? '#fff' : 'var(--text-secondary)',
              border: '1px solid var(--border)', transition: 'all 0.2s'
            }}
          >{d}</button>
        ))}
      </div>

      {/* Subtopics */}
      {filteredTopic.subtopics?.map((subtopic, idx) => (
        <SubtopicSection
          key={subtopic.title}
          subtopic={subtopic}
          topicSlug={slug}
          topicId={topicId}
          subtopicIdx={idx}
        />
      ))}

      {filteredTopic.subtopics?.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '60px 24px', color: 'var(--text-muted)',
          background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border)'
        }}>
          No {diffFilter} problems in this topic.
        </div>
      )}
    </div>
  );
}
