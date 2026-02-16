import React, { useState, useEffect } from 'react';
import { getFeedbacks, addFeedbackReply, toggleFeedbackVisibility } from '../services/api';
import './FeedbackManagement.css';

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date');
  const [replyTexts, setReplyTexts] = useState({});

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await getFeedbacks();
      // API returns { data: [...] }
      const apiData = response.data?.data || [];
      const sorted = sortFeedbacks(apiData, sortBy);
      setFeedbacks(sorted);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setLoading(false);
    }
  };

  const sortFeedbacks = (data, sortType) => {
    const sorted = [...data];
    if (sortType === 'date') {
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortType === 'rating') {
      return sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortBy(newSort);
    const sorted = sortFeedbacks(feedbacks, newSort);
    setFeedbacks(sorted);
  };

  const handleReply = async (feedbackId) => {
    const reply = replyTexts[feedbackId];
    if (!reply || !reply.trim()) {
      alert('Please enter a reply');
      return;
    }

    try {
      await addFeedbackReply(feedbackId, reply);
      setReplyTexts({ ...replyTexts, [feedbackId]: '' });
      fetchFeedbacks();
    } catch (error) {
      console.error('Error adding reply:', error);
      alert('Error adding reply: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleToggleVisibility = async (feedbackId) => {
    try {
      await toggleFeedbackVisibility(feedbackId);
      fetchFeedbacks();
    } catch (error) {
      console.error('Error toggling visibility:', error);
      alert('Error toggling visibility: ' + (error.response?.data?.error || error.message));
    }
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) {
    return <div className="loading">Loading feedbacks...</div>;
  }

  return (
    <div className="feedback-management">
      <div className="feedback-header">
        <h1>Feedback List</h1>
        <div className="sort-controls">
          <label>Sort by:</label>
          <select value={sortBy} onChange={handleSortChange}>
            <option value="date">Date</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="feedback-list">
        {feedbacks.length === 0 ? (
          <div className="empty-state">No feedback found</div>
        ) : (
          feedbacks.map((feedback) => (
            <div key={feedback._id} className="feedback-card">
              <div className="feedback-content">
                <h3 className="feedback-title">{feedback.feedback.substring(0, 50)}...</h3>
                <div className="feedback-meta">
                  Date: {new Date(feedback.createdAt).toLocaleDateString()} | Rating: {feedback.rating}/5 {getRatingStars(feedback.rating)}
                </div>
                <p className="feedback-text">{feedback.feedback}</p>
                <div className="feedback-customer">
                  <strong>From:</strong> {feedback.name} ({feedback.email})
                  {feedback.phone && ` - ${feedback.phone}`}
                  {feedback.productName && (
                    <span className="feedback-product">
                      {' '}| Product: {feedback.productName}
                    </span>
                  )}
                </div>

                {feedback.adminReply && (
                  <div className="admin-reply">
                    <strong>Admin Reply:</strong>
                    <p>{feedback.adminReply}</p>
                    {feedback.repliedAt && (
                      <small>Replied on {new Date(feedback.repliedAt).toLocaleDateString()}</small>
                    )}
                  </div>
                )}

                {!feedback.adminReply && (
                  <div className="reply-section">
                    <textarea
                      placeholder="Type your reply here..."
                      value={replyTexts[feedback._id] || ''}
                      onChange={(e) => setReplyTexts({ ...replyTexts, [feedback._id]: e.target.value })}
                      rows="3"
                    />
                    <button
                      className="btn-reply"
                      onClick={() => handleReply(feedback._id)}
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
              <div className="feedback-actions">
                <button
                  className="btn-hide"
                  onClick={() => handleToggleVisibility(feedback._id)}
                >
                  {feedback.isVisible ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackManagement;
