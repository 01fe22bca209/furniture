import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMapPin, FiMail, FiMessageCircle } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { createContactMessage } from '../services/api';
import CustomerNav from './CustomerNav';
import CustomerFooter from './CustomerFooter';
import './Contact.css';

const SUBJECT_OPTIONS = [
  'Custom Furniture Order',
  'Billing/Payment',
  'Track Order',
  'Product Enquiry',
  'Other'
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await createContactMessage(formData);
      Swal.fire({
        title: 'Message Sent Successfully!',
        text: "We'll get back to you soon.",
        icon: 'success',
        confirmButtonColor: '#722F37'
      });
      setFormData({
        name: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.error || error.message,
        icon: 'error',
        confirmButtonColor: '#722F37'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <CustomerNav />

      <div className="contact-container">
        <div className="contact-content">
          <h1>Get In Touch</h1>
          <p className="contact-subtitle">We're here to help! Reach out to us for any queries or custom orders.</p>

          <div className="contact-wrapper">
            <div className="contact-info">
              <div className="contact-info-card">
                <div className="info-icon"><FiPhone /></div>
                <h3>Phone</h3>
                <p>+91 9449125666</p>
                <p>Mon-Sat: 9:00 AM - 7:00 PM</p>
              </div>

              <div className="contact-info-card">
                <div className="info-icon"><FiMapPin /></div>
                <h3>Address</h3>
                <p>Hubli Road, Mundgod</p>
                <p>Karnataka, India</p>
              </div>

              <div className="contact-info-card">
                <div className="info-icon"><FiMail /></div>
                <h3>Email</h3>
                <p>kamaxiwood@gmail.com</p>
                <p>We respond within 24 hours</p>
              </div>

              <div className="contact-info-card">
                <div className="info-icon"><FiMessageCircle /></div>
                <h3>WhatsApp</h3>
                <p>Chat with us instantly</p>
                <a href="https://wa.me/919449125666" className="whatsapp-link" target="_blank" rel="noopener noreferrer">
                  Open WhatsApp
                </a>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select subject</option>
                      {SUBJECT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us how we can help you..."
                    className="contact-textarea"
                  />
                </div>

                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          <div className="contact-map-section">
            <h2>Find Us on Map</h2>
            <p className="contact-map-text">
              Kamaxi Wood Industries, Hubli Road, Mundgod - 581349, Karnataka, India
            </p>
            <div className="contact-map-wrapper">
              <iframe
                title="Kamaxi Wood Industries Location"
                src="https://www.google.com/maps?q=Kamaxi%20Wood%20Industries%2C%20Hubli%20Road%20Mundgod%20581349&output=embed"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="back-button-section">
          <Link to="/" className="btn-back">← Back to Home</Link>
        </div>
      </div>

      <CustomerFooter />
    </div>
  );
};

export default Contact;
