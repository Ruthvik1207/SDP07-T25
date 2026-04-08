import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthCtx } from '../context/AuthContext';
import PageWrapper from '../components/PageWrapper';

const API_BASE = 'http://localhost:8080/api';

const Login = () => {
  const { login } = useContext(AuthCtx);
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({emailOrVoterId: id, password: pwd})
      });
      const data = await res.json();
      if(res.ok) {
        login(data.token, data.voterId, data.role);
        navigate('/dashboard');
      } else {
        setErr(data.message || 'Invalid credentials');
      }
    } catch (e) {
      setErr('Server error. Please check if backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <section id="auth-section">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Please enter your credentials to access the voting portal.</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Voter ID or Email</label>
              <input 
                value={id} 
                onChange={e=>setId(e.target.value)} 
                type="text" 
                placeholder="e.g., ABC1234567 or Email" 
                required 
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input 
                value={pwd} 
                onChange={e=>setPwd(e.target.value)} 
                type="password" 
                placeholder="Enter your password" 
                required 
              />
            </div>
            <button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          {err && <p className="error-msg">{err}</p>}
          <div className="auth-switch">Don't have an account? <Link to="/signup">Sign up now</Link></div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Login;
