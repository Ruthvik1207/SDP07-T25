import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthCtx } from '../context/AuthContext';
import PageWrapper from '../components/PageWrapper';

const Home = () => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthCtx);

  return (
    <PageWrapper>
      <section id="home-section">
        <div className="hero-section">
          <div className="badge">
            <span style={{marginRight: '8px'}}>✔</span>Democratic Voting Made Simple
          </div>
          <h1>Secure Online Voting Platform <span>for Modern Organizations</span></h1>
          <p className="hero-description">Empower your organization with transparent, secure, and accessible voting technology. From corporate decisions to community elections—all in one platform.</p>
          
          <div className="hero-features">
            <div className="hero-feature-item">
              <span className="icon">🛡️</span>
              <span>Blockchain Verified</span>
            </div>
            <div className="hero-feature-item">
              <span className="icon">🔒</span>
              <span>Military-Grade Encryption</span>
            </div>
            <div className="hero-feature-item">
              <span className="icon">📊</span>
              <span>Real-time Analytics</span>
            </div>
          </div>

          <p className="hero-subtext">Our platform combines military-grade encryption, blockchain verification, and intuitive design to ensure every vote is counted securely and accurately. Whether you're running corporate elections, student body votes, or community referendums, VoteForChange provides the tools you need for transparent, accessible, and fraud-free elections.</p>
          
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate(authToken ? '/dashboard' : '/signup')}>Start Voting Now</button>
            <button className="btn-secondary" onClick={() => navigate('/Service')}>Explore Features</button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Home;
