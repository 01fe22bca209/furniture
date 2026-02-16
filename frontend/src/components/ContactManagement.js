import React, { useEffect, useState } from 'react';
import { getContactMessages, markContactMessageRead } from '../services/api';
import './FeedbackManagement.css';

const ContactManagement = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await getContactMessages();
      // API returns { data: [...] }
      setMessages(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      setLoading(false);
    }
  };

  const toggleRead = async (id, current) => {
    try {
      await markContactMessageRead(id, !current);
      fetchMessages();
    } catch (error) {
      console.error('Error updating message:', error);
      alert('Error updating message: ' + (error.response?.data?.error || error.message));
    }
  };

  if (loading) {
    return <div className="loading">Loading contact messages...</div>;
  }

  return (
    <div className="feedback-management">
      <div className="feedback-header">
        <h1>Contact Messages</h1>
      </div>

      <div className="feedback-list">
        {messages.length === 0 ? (
          <div className="empty-state">No contact messages found</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`feedback-card ${msg.isRead ? 'inactive' : ''}`}
            >
              <div className="feedback-content">
                <h3 className="feedback-title">{msg.subject}</h3>
                <div className="feedback-meta">
                  Date: {new Date(msg.createdAt).toLocaleDateString()}
                </div>
                <p className="feedback-text">{msg.message}</p>
                <div className="feedback-customer">
                  <strong>From:</strong> {msg.name} ({msg.email})
                  {msg.phone && ` - ${msg.phone}`}
                </div>
              </div>
              <div className="feedback-actions">
                <button
                  className="btn-hide"
                  onClick={() => toggleRead(msg._id, msg.isRead)}
                >
                  {msg.isRead ? 'Mark Unread' : 'Mark Read'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactManagement;

