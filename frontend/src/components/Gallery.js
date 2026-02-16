import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, getGalleryImages } from '../services/api';
import CustomerNav from './CustomerNav';
import CustomerFooter from './CustomerFooter';
import './Gallery.css';

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [galleryImages, setGalleryImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useGalleryImages, setUseGalleryImages] = useState(true);

  const categories = ['All', 'Sofa', 'Bed', 'Chair', 'Table', 'Cabinet', 'Desk', 'Wardrobe'];

  useEffect(() => {
    const load = async () => {
      try {
        const [galRes, prodRes] = await Promise.all([
          getGalleryImages().catch(() => ({ data: [] })),
          getProducts().catch(() => ({ data: [] }))
        ]);
        const gal = galRes.data || [];
        setGalleryImages(gal);
        setProducts(prodRes.data || []);
        if (gal.length === 0) setUseGalleryImages(false);
      } catch (e) {
        setUseGalleryImages(false);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const filteredGallery = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => (img.category || '') === selectedCategory);

  const sampleImagesByCategory = {
    Sofa: 'https://via.placeholder.com/400x400?text=Sofa+Sample',
    Bed: 'https://via.placeholder.com/400x400?text=Bed+Sample',
    Chair: 'https://via.placeholder.com/400x400?text=Chair+Sample',
    Table: 'https://via.placeholder.com/400x400?text=Table+Sample',
    Cabinet: 'https://via.placeholder.com/400x400?text=Cabinet+Sample',
    Desk: 'https://via.placeholder.com/400x400?text=Desk+Sample',
    Wardrobe: 'https://via.placeholder.com/400x400?text=Wardrobe+Sample',
    Default: 'https://via.placeholder.com/400x400?text=Furniture+Sample'
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return <div className="loading">Loading gallery...</div>;
  }

  return (
    <div className="gallery-page">
      <CustomerNav />

      <div className="gallery-container">
        <div className="gallery-content">
          <h1>Our Furniture Gallery</h1>
          <p className="gallery-subtitle">Explore our collection of custom-made furniture</p>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {useGalleryImages && filteredGallery.length > 0 ? (
              filteredGallery.map((item) => (
                <div key={item._id} className="gallery-item">
                  <div className="gallery-image-wrapper">
                    <img
                      src={item.imageUrl || item.image || 'https://via.placeholder.com/400x400?text=Gallery'}
                      alt={item.title || item.category || 'Gallery'}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=Gallery'; }}
                    />
                    <div className="gallery-overlay">
                      <h3>{item.title || item.category || 'Furniture'}</h3>
                      {item.category && <p>{item.category}</p>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              filteredProducts.map((product) => (
                <div key={product._id} className="gallery-item">
                  <div className="gallery-image-wrapper">
                    <img
                      src={
                        product.image ||
                        sampleImagesByCategory[product.category] ||
                        sampleImagesByCategory.Default
                      }
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = sampleImagesByCategory[product.category] || sampleImagesByCategory.Default;
                      }}
                    />
                    <div className="gallery-overlay">
                      <h3>{product.name}</h3>
                      <p>{product.category}</p>
                      <button
                        className="btn-view-details"
                        onClick={() => handleViewDetails(product._id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {((useGalleryImages && filteredGallery.length === 0) || (!useGalleryImages && filteredProducts.length === 0)) && (
            <div className="empty-state">
              <p>No images found in this category.</p>
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

export default Gallery;
