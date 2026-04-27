import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Passwords do not match');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
    { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
    { name: 'confirm', label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
  ];

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-primary)', padding: 24,
      backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 60%)'
    }}>
      <div className="fade-in" style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 56, height: 56, margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28
          }}>⚡</div>
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>Create account</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Start your DSA mastery today</p>
        </div>

        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 20, padding: 32, boxShadow: 'var(--shadow)'
        }}>
          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 10, padding: '12px 16px', marginBottom: 20,
              color: 'var(--hard)', fontSize: 14
            }}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            {fields.map(f => (
              <div key={f.name} style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 8, color: 'var(--text-secondary)' }}>
                  {f.label}
                </label>
                <input
                  type={f.type} name={f.name} value={form[f.name]}
                  onChange={handleChange} placeholder={f.placeholder} required
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: 'var(--bg-primary)', border: '1px solid var(--border)',
                    borderRadius: 10, color: 'var(--text-primary)', fontSize: 15,
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            ))}

            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '13px', marginTop: 10,
                background: loading ? 'var(--border)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff', borderRadius: 12, fontSize: 16, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}
            >
              {loading ? <><span className="spinner" />Creating account...</> : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-secondary)', fontSize: 14 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
