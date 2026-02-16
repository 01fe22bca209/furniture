import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar admin-navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <Link to="/admin">
            <img
              src="/logo.png"
              alt="Kamaxi Wood Industries"
              className="navbar-logo-img"
            />
          </Link>
          <span>Admin Panel</span>
        </div>
        <div className="navbar-right">
          <ul className="navbar-links">
            <li><Link to="/admin" className={isActive('/admin') && location.pathname === '/admin' ? 'active' : ''}>Dashboard</Link></li>
            <li><Link to="/admin/orders" className={isActive('/admin/orders') ? 'active' : ''}>Orders</Link></li>
            <li><Link to="/admin/customers" className={isActive('/admin/customers') ? 'active' : ''}>Customers</Link></li>
            <li><Link to="/admin/products" className={isActive('/admin/products') ? 'active' : ''}>Products</Link></li>
            <li><Link to="/admin/gallery" className={isActive('/admin/gallery') ? 'active' : ''}>Gallery</Link></li>
            <li><Link to="/admin/contact" className={isActive('/admin/contact') ? 'active' : ''}>Contact</Link></li>
            <li><Link to="/admin/invoices" className={isActive('/admin/invoices') ? 'active' : ''}>Billing</Link></li>
            <li><Link to="/admin/login" onClick={() => localStorage.removeItem('adminAuth')}>Logout</Link></li>
          </ul>
          <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
