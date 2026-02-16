import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createFeedback, createFeedbackWithImage, getFeedbackPhotos } from '../services/api';
import CustomerNav from './CustomerNav';
import CustomerFooter from './CustomerFooter';
import './Feedback.css';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    productName: '',
    rating: '',
    feedback: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [customerPhotos, setCustomerPhotos] = useState([]);

  useEffect(() => {
    getFeedbackPhotos().then(res => setCustomerPhotos(res.data?.data || [])).catch(() => {});
  }, [submitted]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (imageFile) {
        const fd = new FormData();
        fd.append('name', formData.name);
        fd.append('productName', formData.productName);
        fd.append('rating', String(formData.rating));
        fd.append('feedback', formData.feedback);
        fd.append('image', imageFile);
        await createFeedbackWithImage(fd);
      } else {
        await createFeedback({
          ...formData,
          rating: parseInt(formData.rating)
        });
      }
      setSubmitted(true);
      setImageFile(null);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', productName: '', rating: '', feedback: '' });
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="feedback-page">
      <CustomerNav />

      <div className="feedback-container">
        <div className="feedback-content">
          <h1>Share Your Feedback</h1>
          <p className="feedback-subtitle">We'd love to hear about your experience with us!</p>

          {submitted && (
            <div className="success-message">
              <p>✓ Thank you for your feedback! We appreciate your time.</p>
            </div>
          )}

          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="productName">Which product is this about? *</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                placeholder="e.g., Sofa, Bed, Custom Wardrobe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Overall Rating *</label>
              <div className="rating-buttons">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className={`rating-btn ${formData.rating === rating.toString() ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, rating: rating.toString() })}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="feedback">Your Feedback *</label>
              <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Tell us about your experience, suggestions, or any concerns..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Add a photo (optional)</label>
              <input
                type="file"
                id="image"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="feedback-file-input"
              />
              {imageFile && <span className="file-name">{imageFile.name}</span>}
            </div>

            <button type="submit" className="btn-submit">Submit Feedback</button>
          </form>

          {customerPhotos.length > 0 && (
            <div className="customer-photos-section">
              <h2>Customer Photos</h2>
              <p className="customer-photos-subtitle">Photos shared by our customers</p>
              <div className="customer-photos-grid">
                {customerPhotos.map((item) => (
                  <div key={item._id} className="customer-photo-card">
                    <img src={item.imageUrl} alt={item.productName || 'Feedback'} />
                    <div className="customer-photo-info">
                      <span className="product-name">{item.productName || 'Furniture'}</span>
                      <span className="rating">{'⭐'.repeat(item.rating || 0)}</span>
                      {item.feedback && <p className="feedback-preview">{item.feedback.substring(0, 80)}...</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="back-button-section">
            <Link to="/" className="btn-back">← Back to Home</Link>
          </div>
        </div>
      </div>

      <CustomerFooter />
    </div>
  );
};

export default Feedback;
