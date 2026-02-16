import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './CustomerNav.css';

const CustomerNav = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="customer-header">
        <div className="customer-header-content">
          <Link to="/" className="customer-logo" aria-label="Kamaxi Wood Industries - Home">
            <img
              src="/logo.png"
              alt="Kamaxi Wood Industries"
              className="customer-logo-image"
            />
          </Link>
          <nav className="customer-nav">
            <Link
              to="/"
              className={`customer-nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/gallery"
              className={`customer-nav-link ${isActive('/gallery') ? 'active' : ''}`}
            >
              Gallery
            </Link>
            <Link
              to="/track-order"
              className={`customer-nav-link ${isActive('/track-order') ? 'active' : ''}`}
            >
              Track Order
            </Link>
            <Link
              to="/feedback"
              className={`customer-nav-link ${isActive('/feedback') ? 'active' : ''}`}
            >
              Feedback
            </Link>
            <Link
              to="/faqs"
              className={`customer-nav-link ${isActive('/faqs') ? 'active' : ''}`}
            >
              FAQs
            </Link>
            <Link
              to="/contact"
              className={`customer-nav-link ${isActive('/contact') ? 'active' : ''}`}
            >
              Contact
            </Link>
          </nav>
          <div className="customer-header-actions">
            <button
              className="customer-theme-toggle"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <a
              href="https://wa.me/919449125666"
              className="customer-whatsapp-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default CustomerNav;
