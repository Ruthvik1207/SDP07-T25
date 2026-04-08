import React from 'react';
import PageWrapper from '../components/PageWrapper';

const Contact = () => (
  <PageWrapper>
    <section id="contact-section">
      <div className="contact-header">
        <h2>Get in Touch</h2>
        <p>Have an issue or question? Our support team is here to help you 24/7.</p>

        <div className="contact-info-row">
          <div className="contact-info-item">📞 <span>+91 9998887777</span></div>
          <div className="contact-info-item">📧 <span>Contact@VoteForChange.in</span></div>
        </div>
      </div>

      <div className="contact-card">
        <h3>Enquiry for Service</h3>
        <p className="card-subtitle">Fill out the form below to get in touch.</p>
        
        <form className="contact-form">
          <div className="input-group"><label>Name *</label><input type="text" placeholder="Your Name" required /></div>
          <div className="input-group"><label>Email *</label><input type="email" placeholder="Your Email Address" required /></div>
          <div className="input-group"><label>Subject *</label><input type="text" placeholder="What is this about?" required /></div>
          <div className="input-group"><label>Message *</label><textarea placeholder="Please describe your issue..." rows="4" required></textarea></div>
          <button type="submit" className="btn-primary form-submit">Submit Message</button>
        </form>
      </div>
    </section>
  </PageWrapper>
);

export default Contact;
