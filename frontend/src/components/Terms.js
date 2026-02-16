import React from 'react';
import { Link } from 'react-router-dom';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-page">
      <header className="terms-header">
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

      <div className="terms-container">
        <div className="terms-content">
          <h1>Terms of Service</h1>
          <p className="terms-updated">Last updated: January 2026</p>

          <section className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Kamaxi Wood Industries' website and services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Products and Services</h2>
            <p>
              We offer custom-made furniture products. All products are made to order according to your specifications. Product images on our website are for reference purposes and actual products may vary slightly.
            </p>
          </section>

          <section className="terms-section">
            <h2>3. Orders and Payment</h2>
            <p>
              When you place an order, you agree to provide accurate and complete information. We require an advance payment to begin production. The remaining balance is due upon delivery or as agreed upon in writing.
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Delivery</h2>
            <p>
              Delivery times are estimates and may vary based on order complexity and current workload. We will notify you of any significant delays. Delivery charges may apply based on location.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. Cancellation and Returns</h2>
            <p>
              Orders can be cancelled within 24-48 hours of placement. Once production has begun, cancellation may incur charges. Custom-made items are non-returnable unless there is a manufacturing defect.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Warranty</h2>
            <p>
              We provide warranty on all our furniture products. Warranty terms vary by product type and will be detailed in your invoice. Warranty covers manufacturing defects only.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. Limitation of Liability</h2>
            <p>
              Kamaxi Wood Industries shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.
            </p>
          </section>

          <section className="terms-section">
            <h2>8. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
              <br />
              Email: kamaxiwood@gmail.com
              <br />
              Phone: +91 9449125666
              <br />
              Address: Hubli Road, Mundgod - 581349, Karnataka, India
            </p>
          </section>

          <div className="terms-back">
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

export default Terms;
