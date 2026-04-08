import React, { useState, useEffect, useContext } from 'react';
import { AuthCtx } from '../context/AuthContext';
import PageWrapper from '../components/PageWrapper';
import LoadingSpinner from '../components/LoadingSpinner';

const API_BASE = 'http://localhost:8080/api';

const Voting = () => {
  const { authToken } = useContext(AuthCtx);
  const [cands, setCands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [votedUser, setVotedUser] = useState(null);

  useEffect(() => {
    const checkStatusAndFetchCands = async () => {
      setLoading(true);
      try {
        // 1. Check user profile first to see if they already voted
        const profRes = await fetch(`${API_BASE}/auth/profile`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        if (profRes.ok) {
          const userData = await profRes.json();
          // Strengthen the check to handle 0/1 or true/false correctly
          if (userData.has_voted === 1 || userData.has_voted === true) {
            setVotedUser(userData);
            setVoteSuccess(true);
            setLoading(false);
            return;
          }
        }

        // 2. If not voted, fetch candidates
        const candRes = await fetch(`${API_BASE}/candidates`, { 
          headers: {'Authorization': `Bearer ${authToken}`} 
        });
        const candData = await candRes.json();
        setCands(candData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Failed to load voting data.');
      }
    };

    checkStatusAndFetchCands();
  }, [authToken]);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setVotedUser(data);
      }
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
    }
  };

  const castVote = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/vote`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${authToken}` 
        },
        body: JSON.stringify({candidateId: id})
      });
      
      if(res.ok) { 
        alert('Vote cast successfully!');
        setVoteSuccess(true);
        await fetchUserProfile();
      } else {
        const data = await res.json();
        // If they already voted, just show the receipt instead of an alert
        if (data.message === 'You have already voted') {
          setVoteSuccess(true);
          await fetchUserProfile();
        } else {
          alert(`Error: ${data.message || 'Action failed.'}`);
        }
      }
    } catch (e) {
      alert('Network error. Please try again.');
    }
  };

  const renderCandidates = () => {
    return (
      <div className="candidates-grid">
        {cands.map(c => {
          const isVotedThis = votedUser && votedUser.voted_for == c.id;
          const hasVotedAny = votedUser && votedUser.has_voted;
          
          return (
            <div key={c.id} className="candidate-card" style={isVotedThis ? { borderColor: 'var(--success)', boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' } : {}}>
              <div className="cand-avatar">{isVotedThis ? '✅' : '👤'}</div>
              <div className="candidate-name">{c.name}</div>
              <div className="candidate-party">{c.party}</div>
              
              {isVotedThis ? (
                <button className="btn-primary" style={{ background: 'var(--success)', cursor: 'default' }} disabled>
                  Voted
                </button>
              ) : (
                <button 
                  className="btn-primary" 
                  onClick={() => castVote(c.id)} 
                  disabled={hasVotedAny}
                  style={hasVotedAny ? { opacity: 0.5, cursor: 'not-allowed', filter: 'grayscale(1)' } : {}}
                >
                  Vote Now
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <PageWrapper>
      <section id="voting-section">
        {voteSuccess && votedUser && (
          <div className="auth-card" style={{ maxWidth: '800px', marginBottom: '3rem', padding: '2rem' }}>
             <div className="success-msg">✓ Voting complete! Your choice has been recorded securely.</div>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem', textAlign: 'left', fontSize: '0.9rem' }}>
                <p><strong>Voter:</strong> {votedUser.name}</p>
                <p><strong>Voter ID:</strong> {votedUser.voter_id}</p>
                <p><strong>Status:</strong> <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>VERIFIED</span></p>
             </div>
          </div>
        )}

        <div className="voting-header">
          <h2>Candidate Selection</h2>
          <p>
            {voteSuccess 
              ? "You have successfully cast your vote. Below is the confirmation of your selection." 
              : "Carefully select your preferred candidate. This action is final and cannot be reversed."}
          </p>
        </div>

        {error && <p className="error-msg">{error}</p>}

        {loading ? <LoadingSpinner /> : renderCandidates()}
      </section>
    </PageWrapper>
  );
};

export default Voting;
