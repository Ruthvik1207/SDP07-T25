import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthCtx } from '../context/AuthContext';

const Navbar = () => {
  const { authToken, currentUser, userRole, logout } = useContext(AuthCtx);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav id="navbar">
      <div className="logo" onClick={() => navigate('/')}>
        VoteFor<span>Change</span>
      </div>
      
      {!authToken ? (
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/Service" className="nav-link">Features</Link>
          <Link to="/Contact" className="nav-link">Contact Us</Link>
          <Link to="/Login" className="btn-nav-login">Sign In</Link>
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/voting" className="nav-link">Vote Now</Link>
          {userRole === 'ADMIN' && <Link to="/admin" className="nav-link">Admin Results</Link>}
          <div className="voter-profile" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '10px' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-dark)' }}>
              Voter ID: <span style={{ color: 'var(--primary-color)' }}>{currentUser}</span>
            </span>
            <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
