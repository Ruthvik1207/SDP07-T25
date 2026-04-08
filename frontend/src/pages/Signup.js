import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const [succ, setSucc] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr('');
    setSucc('');
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, password: pwd})
      });
      const data = await res.json();
      if(res.ok) {
        setSucc(`Successfully registered! Your Voter ID is ${data.voterId}. Please login.`);
        setErr('');
        setName('');
        setEmail('');
        setPwd('');
      } else {
        setErr(data.message || 'Registration failed');
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
            <h2>Create Account</h2>
            <p>Join the secure voting platform today.</p>
          </div>
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label>Full Name</label>
              <input value={name} onChange={e=>setName(e.target.value)} type="text" placeholder="Enter your full name" required />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Enter your email" required />
            </div>
            <div className="input-group">
              <label>Voter ID</label>
              <input type="text" placeholder="Auto-generated on registration" disabled className="disabled-input" />
            </div>
            <div className="input-group">
              <label>Create Password</label>
              <input value={pwd} onChange={e=>setPwd(e.target.value)} type="password" placeholder="Enter your password" required />
            </div>
            <button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          {err && <p className="error-msg">{err}</p>}
          {succ && <p className="success-msg">{succ}</p>}
          <div className="auth-switch">Already have an account? <Link to="/Login">Login here</Link></div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Signup;
