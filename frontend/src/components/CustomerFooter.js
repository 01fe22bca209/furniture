import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMapPin, FiMail } from 'react-icons/fi';
import './CustomerFooter.css';

const CustomerFooter = () => (
  <footer className="customer-footer">
    <div className="customer-footer-content">
      <div className="customer-footer-section">
        <h3>Contact Us</h3>
        <p className="customer-footer-tagline">Handcrafted Furniture Made to Perfection</p>
        <p><FiPhone className="footer-icon" /> +91 9449125666</p>
        <p><FiMapPin className="footer-icon" /> Hubli Road, Mundgod</p>
        <p><FiMail className="footer-icon" /> kamaxiwood@gmail.com</p>
      </div>
      <div className="customer-footer-bottom">
        <p>© 2023 Furniture Co. All rights reserved.</p>
        <div className="customer-footer-links">
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default CustomerFooter;
