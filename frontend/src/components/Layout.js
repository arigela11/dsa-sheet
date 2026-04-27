import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{
        background: 'rgba(15,23,42,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 100,
        padding: '0 24px',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link to="/dashboard" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18
          }}>⚡</div>
          <span style={{ fontWeight: 700, fontSize: 20, color: 'var(--text-primary)' }}>
            DSA<span style={{ color: 'var(--accent)' }}>Sheet</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link to="/dashboard" style={{
            padding: '6px 14px', borderRadius: 8,
            background: location.pathname === '/dashboard' ? 'var(--accent-dim)' : 'transparent',
            color: location.pathname === '/dashboard' ? 'var(--accent)' : 'var(--text-secondary)',
            fontWeight: 500, fontSize: 14, transition: 'all 0.2s'
          }}>Dashboard</Link>

          {/* User menu */}
          <div style={{ marginLeft: 8, position: 'relative' }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                borderRadius: 10, padding: '6px 12px', color: 'var(--text-primary)',
                cursor: 'pointer', fontSize: 14
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: '#fff'
              }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.name}
              </span>
              <span style={{ fontSize: 10, opacity: 0.5 }}>▼</span>
            </button>

            {menuOpen && (
              <div style={{
                position: 'absolute', top: '100%', right: 0, marginTop: 8,
                background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                borderRadius: 12, padding: 8, minWidth: 180,
                boxShadow: 'var(--shadow)', zIndex: 200
              }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{user?.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user?.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%', textAlign: 'left', padding: '8px 12px',
                    background: 'transparent', color: 'var(--hard)', borderRadius: 8,
                    fontSize: 14, fontWeight: 500
                  }}
                >Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Click outside to close menu */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setMenuOpen(false)} />
      )}

      <main style={{ flex: 1, padding: '32px 24px', maxWidth: 1200, width: '100%', margin: '0 auto' }}>
        {children}
      </main>

      <footer style={{
        borderTop: '1px solid var(--border)', padding: '16px 24px',
        textAlign: 'center', color: 'var(--text-muted)', fontSize: 13
      }}>
        DSA Sheet — Built with MERN Stack 
      </footer>
    </div>
  );
}
