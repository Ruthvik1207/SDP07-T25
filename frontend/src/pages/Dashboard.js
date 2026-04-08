import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCtx } from '../context/AuthContext';
import PageWrapper from '../components/PageWrapper';

const Dashboard = () => {
  const { currentUser, userRole } = useContext(AuthCtx);
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <section id="dashboard-section">
        <div className="dashboard-header">
          <h2>Welcome, Voter</h2>
          <p>This is your personal dashboard. You can access the voting area and view live results (if available).</p>
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-card status-card">
            <div className="card-icon">🪪</div>
            <h3>Your Voter ID</h3>
            <p className="highlight-text">{currentUser || 'ID Loading...'}</p>
          </div>
          
          <div className="dashboard-card status-card">
            <div className="card-icon">🗳️</div>
            <h3>Voting Status</h3>
            <p className="highlight-text">Eligible</p>
          </div>
        </div>

        <div className="dashboard-actions">
          <button onClick={() => navigate('/voting')} className="btn-primary">
            Go to Voting Area
          </button>
          
          {userRole === 'ADMIN' && (
            <button onClick={() => navigate('/admin')} className="btn-secondary">
              🔧 Admin Panel
            </button>
          )}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Dashboard;
