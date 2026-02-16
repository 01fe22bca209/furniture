import React from 'react';
import { Link } from 'react-router-dom';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-page">
      <header className="privacy-header">
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

      <div className="privacy-container">
        <div className="privacy-content">
          <h1>Privacy Policy</h1>
          <p className="privacy-updated">Last updated: January 2026</p>

          <section className="privacy-section">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul>
              <li>Name, email address, phone number</li>
              <li>Delivery address and billing information</li>
              <li>Order details and preferences</li>
              <li>Feedback and communication records</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders</li>
              <li>Send you updates and promotional materials (with your consent)</li>
              <li>Improve our products and services</li>
              <li>Respond to your inquiries and feedback</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information only:
            </p>
            <ul>
              <li>With service providers who assist us in operating our business</li>
              <li>When required by law or to protect our rights</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="privacy-section">
            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>6. Cookies</h2>
            <p>
              We use cookies to enhance your browsing experience and analyze website traffic. You can choose to disable cookies through your browser settings.
            </p>
          </section>

          <section className="privacy-section">
            <h2>7. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
              <br />
              Email: kamaxiwood@gmail.com
              <br />
              Phone: +91 9449125666
              <br />
              Address: Hubli Road, Mundgod - 581349, Karnataka, India
            </p>
          </section>

          <div className="privacy-back">
            <Link to="/" className="btn-back">Back to Home</Link>
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

export default Privacy;
