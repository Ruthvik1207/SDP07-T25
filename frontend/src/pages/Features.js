import React from 'react';
import PageWrapper from '../components/PageWrapper';

const Features = () => (
  <PageWrapper>
    <section id="features-section">
      <div className="section-header">
        <h2>Powerful Election Features</h2>
        <p className="subtitle">Secure - Swift - Simple | Everything for Modern Organizations</p>
      </div>

      <div className="features-grid">
        {[
          { icon: '🔒', title: 'End-to-End Encryption', desc: 'Military-grade encryption ensures your votes are completely secure and private.' },
          { icon: '📱', title: 'Mobile Accessible', desc: 'Vote from any device - smartphones, tablets, or desktops with a seamless experience.' },
          { icon: '⚡', title: 'Real-Time Analytics', desc: 'Live voting statistics and instant result visualization for election organizers.' },
          { icon: '🎯', title: 'Precise Vote Counting', desc: 'Accurate vote counting with blockchain verification for complete transparency.' },
          { icon: '🌍', title: 'Global Accessibility', desc: 'Support for 50+ languages and international standards.' },
          { icon: '🛡️', title: 'Fraud Detection', desc: 'Advanced AI-powered fraud detection prevents duplicate and illegal votes.' }
        ].map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </PageWrapper>
);

export default Features;
