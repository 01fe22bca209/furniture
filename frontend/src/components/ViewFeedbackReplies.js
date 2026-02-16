import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeedbacks } from '../services/api';
import './ViewFeedbackReplies.css';

const ViewFeedbackReplies = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await getFeedbacks();
      const allFeedbacks = response.data?.data || response.data || [];
      // Filter feedbacks that have admin replies and match email/phone
      const filtered = allFeedbacks.filter(fb => 
        fb.adminReply && 
        (email ? fb.email.toLowerCase() === email.toLowerCase() : true) &&
        (phone ? fb.phone === phone : true)
      );
      setFeedbacks(filtered);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      alert('Error fetching feedback replies');
    } finally {
      setLoading(false);
    }
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="view-feedback-replies-page">
      <header className="view-feedback-header">
        <div className="header-content">
          <Link to="/" className="logo">
            <img
              src="/logo.png"
              alt="Kamaxi Wood Industries"
              className="logo-image"
            />
          </Link>
          <nav className="header-nav">
            <Link to="/">Home</Link>
            <Link to="/products">Gallery</Link>
            <Link to="/track-order">Track Order</Link>
            <Link to="/feedback">Feedback</Link>
            <Link to="/faqs">FAQs</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <a href="https://wa.me/919449125666" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </header>

      <div className="view-feedback-container">
        <div className="view-feedback-content">
          <h1>View Feedback Replies</h1>
          <p className="view-feedback-subtitle">Enter your email or phone to see admin replies to your feedback</p>

          <form className="search-form" onSubmit={handleSearch}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <button type="submit" className="btn-search" disabled={loading || (!email && !phone)}>
              {loading ? 'Searching...' : 'Search Replies'}
            </button>
          </form>

          {feedbacks.length > 0 && (
            <div className="replies-list">
              <h2>Your Feedback Replies</h2>
              {feedbacks.map((feedback) => (
                <div key={feedback._id} className="reply-card">
                  <div className="reply-header">
                    <div className="reply-meta">
                      <strong>{feedback.name}</strong>
                      <span className="reply-date">{new Date(feedback.createdAt).toLocaleDateString()}</span>
                      <span className="reply-rating">{getRatingStars(feedback.rating)}</span>
                    </div>
                  </div>
                  <div className="reply-content">
                    <h3>Your Feedback:</h3>
                    <p>{feedback.feedback}</p>
                  </div>
                  <div className="admin-reply-section">
                    <h3>Admin Reply:</h3>
                    <div className="admin-reply-box">
                      <p>{feedback.adminReply}</p>
                      {feedback.repliedAt && (
                        <small>Replied on {new Date(feedback.repliedAt).toLocaleDateString()}</small>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {feedbacks.length === 0 && !loading && email && (
            <div className="no-replies">
              <p>No replies found for your email/phone. Make sure you've submitted feedback and admin has replied.</p>
            </div>
          )}

          <div className="back-button-section">
            <Link to="/" className="btn-back">← Back to Home</Link>
          </div>
        </div>
      </div>

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>📞 +91 9449125666</p>
            <p>📍 Hubli Road, Mundgod</p>
            <p>✉️ kamaxiwood@gmail.com</p>
          </div>
          <div className="footer-bottom">
            <p>© 2023 Furniture Co. All rights reserved.</p>
            <div className="footer-links">
              <Link to="/terms">Terms of Service</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ViewFeedbackReplies;
