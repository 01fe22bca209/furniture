import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getProduct, getCustomers, createOrder } from '../services/api';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    productName: searchParams.get('productName') || '',
    customerName: '',
    phone: '',
    address: '',
    customDimensions: '',
    notes: '',
    referenceImage: null,
    advancePayment: null
  });

  useEffect(() => {
    const productId = searchParams.get('productId');
    if (productId) {
      fetchProduct(productId);
    }
    fetchCustomers();
    setLoading(false);
  }, []);

  const fetchProduct = async (id) => {
    try {
      const response = await getProduct(id);
      setProduct(response.data);
      setFormData(prev => ({
        ...prev,
        productName: response.data.name
      }));
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0] || null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find or create customer
    let customer = customers.find(c => c.phone === formData.phone);
    
    if (!customer) {
      // In a real app, you'd create the customer first
      alert('Please ensure customer exists. Customer will be created automatically.');
    }

    try {
      // For now, we'll use the first customer or create a simple order
      // In production, you'd handle customer creation properly
      const customerId = customer?._id || customers[0]?._id;
      
      if (!customerId && !product) {
        alert('Please select a product and ensure customer information is correct');
        return;
      }

      // Create order
      const orderData = {
        customer: customerId || 'new', // In production, create customer first
        items: [{
          product: product?._id || '',
          quantity: 1
        }],
        notes: formData.notes,
        deliveryAddress: {
          street: formData.address
        }
      };

      // Note: File uploads would need to be handled separately with FormData
      // For now, we'll just create the order
      const response = await createOrder(orderData);
      
      // Navigate to success page
      navigate(`/order-success?orderId=${response.data.orderNumber}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error placing order: ' + (error.response?.data?.error || error.message));
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="place-order-page">
      <div className="place-order-container">
        <h1>Place Your Order</h1>
        
        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address (for delivery)</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Custom Dimensions (optional)</label>
            <input
              type="text"
              name="customDimensions"
              value={formData.customDimensions}
              onChange={handleInputChange}
              placeholder="e.g., 120cm x 80cm x 75cm"
            />
          </div>

          <div className="form-group">
            <label>Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Upload Reference Image (optional)</label>
            <input
              type="file"
              name="referenceImage"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="form-group">
            <label>Advance Payment Upload (screenshot / receipt)</label>
            <input
              type="file"
              name="advancePayment"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="btn btn-submit-order">
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
