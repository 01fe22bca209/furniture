import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api';
import './ProductsPage.css';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');

  const categories = ['All', 'Sofa', 'Bed', 'Chair', 'Table', 'Cabinet', 'Desk'];

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || 'All';
    setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      const category = selectedCategory === 'All' ? null : selectedCategory;
      const response = await getProducts(category ? { category } : {});
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const url = category !== 'All' ? `?category=${category}` : '';
    navigate(`/products${url}`);
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products</h1>
      </div>

      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {products.length === 0 ? (
          <div className="empty-state">
            <p>No products found in this category.</p>
          </div>
        ) : (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image-placeholder">
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <div className="image-placeholder">Image</div>
                )}
              </div>
              <h3 className="product-model">{product.name}</h3>
              <p className="product-material">{product.material || 'Premium Material'}</p>
              <button
                className="btn btn-view-details"
                onClick={() => handleViewDetails(product._id)}
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
