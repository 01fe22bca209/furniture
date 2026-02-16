import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import CustomerNav from './CustomerNav';
import CustomerFooter from './CustomerFooter';
import './Home.css';

// Category config: imageKey is the filename in public/images/categories/ (e.g. Sofa.jpg)
// Add your images to frontend/public/images/categories/ with these names to show custom images.
const CATEGORIES = [
  { imageKey: 'Sofa', label: 'Sofas', to: '/products?category=Sofa', fallback: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop' },
  { imageKey: 'Bed', label: 'Beds', to: '/products?category=Bed', fallback: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop' },
  { imageKey: 'Chair', label: 'Chairs', to: '/products?category=Chair', fallback: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200&h=200&fit=crop' },
  { imageKey: 'Table', label: 'Tables', to: '/products?category=Table', fallback: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=200&h=200&fit=crop' },
  { imageKey: 'Cabinet', label: 'Cabinets', to: '/products?category=Cabinet', fallback: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop' },
  { imageKey: 'Desk', label: 'Desks', to: '/products?category=Desk', fallback: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&h=200&fit=crop' },
  { imageKey: 'Other', label: 'Others', to: '/products', fallback: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop' },
];

const categoriesImagePath = (imageKey, ext = 'jpg') => {
  const base = process.env.PUBLIC_URL || '';
  return `${base}/images/categories/${imageKey}.${ext}`;
};

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className="home" data-theme={theme}>
      <CustomerNav />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Custom Wooden Furniture, Crafted for Your Space</h1>
          <p className="hero-tagline">Premium handmade furniture designed to last generations.</p>
          <Link to="/gallery" className="btn btn-hero">Explore Gallery →</Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Categories</h2>
        <p className="categories-hint">Browse our product catalog by category</p>
        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <Link key={cat.imageKey} to={cat.to} className="category-card">
              <img
                src={categoriesImagePath(cat.imageKey)}
                alt={cat.label}
                className="category-icon"
                onError={(e) => {
                  const img = e.target;
                  if (img.dataset.triedPng) {
                    img.onerror = null;
                    img.src = cat.fallback;
                    return;
                  }
                  img.dataset.triedPng = '1';
                  img.onerror = () => { img.onerror = null; img.src = cat.fallback; };
                  img.src = categoriesImagePath(cat.imageKey, 'png');
                }}
              />
              <span className="category-label">Browse</span>
              <h3>{cat.label}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌳</div>
            <h3>Premium Wood</h3>
            <p>We use only the finest quality wood for durability and elegance.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Affordable Pricing</h3>
            <p>High-quality furniture at prices that won't break the bank.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚙️</div>
            <h3>Skilled Craftsmen</h3>
            <p>Our team of experienced artisans ensures perfection in every piece.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Delivery On Time</h3>
            <p>Reliable and prompt delivery right to your doorstep.</p>
          </div>
        </div>
      </section>

      <CustomerFooter />
    </div>
  );
};

export default Home;
