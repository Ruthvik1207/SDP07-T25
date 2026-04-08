import React, { useState, useEffect, useContext } from 'react';
import { AuthCtx } from '../context/AuthContext';
import PageWrapper from '../components/PageWrapper';
import LoadingSpinner from '../components/LoadingSpinner';

const API_BASE = 'http://localhost:8080/api';

const Admin = () => {
  const { authToken } = useContext(AuthCtx);
  const [res, setRes] = useState([]);
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch(`${API_BASE}/admin/results`, { 
      headers: {'Authorization': `Bearer ${authToken}`} 
    })
      .then(r => r.json())
      .then(d => { setRes(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(load, [authToken]);

  const add = async (e) => {
    e.preventDefault();
    if(!name || !party) return;
    const response = await fetch(`${API_BASE}/admin/add-candidate`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${authToken}` 
      },
      body: JSON.stringify({name, party})
    });
    if(response.ok) { setName(''); setParty(''); load(); }
  };

  const del = async (id) => {
    if(!window.confirm('Delete candidate?')) return;
    await fetch(`${API_BASE}/admin/delete-candidate/${id}`, { 
      method: 'DELETE', 
      headers: {'Authorization': `Bearer ${authToken}`} 
    });
    load();
  };

  return (
    <PageWrapper>
      <section id="admin-section">
        <h2 className="admin-title">Admin Control Panel</h2>
        
        <div className="admin-add-card">
          <h3>Add New Candidate</h3>
          <form className="admin-controls" onSubmit={add}>
            <div className="input-group">
              <input 
                value={name} 
                onChange={e=>setName(e.target.value)} 
                type="text" 
                placeholder="Candidate Full Name" 
                required 
              />
            </div>
            <div className="input-group">
              <input 
                value={party} 
                onChange={e=>setParty(e.target.value)} 
                type="text" 
                placeholder="Political Party" 
                required 
              />
            </div>
            <button type="submit" className="btn-primary">Add Candidate</button>
          </form>
        </div>

        <div className="admin-results-card">
          <h3>Election Results</h3>
          {loading ? <LoadingSpinner /> : (
            <div className="results-list">
              {res.map(c => (
                <div key={c.id} className="result-item">
                  <div className="result-info">
                    <strong>{c.name}</strong> <span className="party-tag">{c.party}</span>
                    <div className="vote-count">Votes: <span>{c.votes}</span></div>
                  </div>
                  <button onClick={() => del(c.id)} className="btn-danger-outline">Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Admin;
