import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProduct(id);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const handlePlaceOrder = () => {
    navigate(`/place-order?productId=${id}&productName=${encodeURIComponent(product.name)}`);
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${product?.name}. Can you provide more details?`;
    window.open(`https://wa.me/919449125666?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="empty-state">Product not found</div>;
  }

  const woodOptions = product.material ? product.material.split(',').map(w => w.trim()) : ['Oak', 'Walnut', 'Maple'];

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image-section">
          <div className="product-image-placeholder-large">
            {product.image ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <div className="image-placeholder-large">Product Image</div>
            )}
          </div>
        </div>

        <div className="product-info-section">
          <h1 className="product-name">{product.name}</h1>
          
          <div className="product-description">
            <p>
              {product.description || `This ${product.name.toLowerCase()} is crafted with precision and attention to detail. 
              Made from premium materials, it combines functionality with elegant design. 
              Perfect for modern homes, this piece offers durability and style. 
              Our skilled craftsmen ensure every detail is perfect, creating furniture that lasts for generations.`}
            </p>
          </div>

          <div className="product-options">
            <div className="option-group">
              <label>Material Type / Wood Options</label>
              <div className="wood-options">
                {woodOptions.map((wood, index) => (
                  <span key={index} className="wood-option">{wood}</span>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label>Dimensions</label>
              <div className="dimensions">
                {product.dimensions && (product.dimensions.length || product.dimensions.width || product.dimensions.height) ? (
                  <span>
                    {product.dimensions.length}cm × {product.dimensions.width}cm × {product.dimensions.height}cm
                  </span>
                ) : (
                  <span>Standard / Custom</span>
                )}
              </div>
            </div>
          </div>

          <div className="product-price">
            <span className="price-label">Price:</span>
            <span className="price-value">₹{product.price.toLocaleString()}</span>
          </div>

          <div className="product-actions">
            <button className="btn btn-place-order" onClick={handlePlaceOrder}>
              Place Order
            </button>
            <button className="btn btn-whatsapp" onClick={handleWhatsApp}>
              <span className="whatsapp-icon">💬</span>
              WhatsApp Contact (quick enquiry)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
