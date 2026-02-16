import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getOrders } from '../services/api';
import CustomerNav from './CustomerNav';
import CustomerFooter from './CustomerFooter';
import './TrackOrder.css';

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const statusSteps = [
    { key: 'Order Received', status: 'Pending' },
    { key: 'Material Procurement', status: 'Confirmed' },
    { key: 'Manufacturing Started', status: 'Processing' },
    { key: 'Finishing', status: 'Processing' },
    { key: 'Ready for Delivery', status: 'Shipped' },
    { key: 'Delivered', status: 'Delivered' }
  ];

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await getOrders();
      const orders = response.data;
      
      const foundOrder = orders.find(o => 
        o.orderNumber === orderId && 
        o.customer?.phone === phone
      );

      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError('Order not found. Please check your Order ID and Phone Number.');
        setOrder(null);
      }
    } catch (error) {
      console.error('Error tracking order:', error);
      setError('Error tracking order. Please try again.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const getStepStatus = (step, orderStatus) => {
    const statusMap = {
      'Pending': ['Order Received'],
      'Confirmed': ['Order Received', 'Material Procurement'],
      'Processing': ['Order Received', 'Material Procurement', 'Manufacturing Started', 'Finishing'],
      'Shipped': ['Order Received', 'Material Procurement', 'Manufacturing Started', 'Finishing', 'Ready for Delivery'],
      'Delivered': ['Order Received', 'Material Procurement', 'Manufacturing Started', 'Finishing', 'Ready for Delivery', 'Delivered'],
      'Cancelled': []
    };

    return statusMap[orderStatus]?.includes(step) || false;
  };

  return (
    <div className="track-order-page">
      <CustomerNav />
      <div className="track-order-container-wrapper">
        <div className="track-order-container">
        <h1>Track Your Order</h1>
        
        <form onSubmit={handleTrack} className="track-form">
          <div className="form-group">
            <label>Enter Order ID</label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g., ORD-12345"
              required
            />
          </div>

          <div className="form-group">
            <label>Enter Mobile Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <button type="submit" className="btn btn-track" disabled={loading}>
            {loading ? 'Tracking...' : 'Track'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {order && (
          <div className="order-status-section">
            <h2>Order Status</h2>
            <div className="status-timeline">
              {statusSteps.map((step, index) => {
                const isCompleted = getStepStatus(step.key, order.status);
                return (
                  <div key={step.key} className="status-step">
                    <div className={`step-indicator ${isCompleted ? 'completed' : ''}`}>
                      {isCompleted ? '✓' : ''}
                    </div>
                    <div className="step-label">{step.key}</div>
                  </div>
                );
              })}
            </div>

            <div className="order-details">
              <div className="detail-item">
                <strong>Delivery Date:</strong> {order.status === 'Delivered' 
                  ? new Date(order.updatedAt).toLocaleDateString() 
                  : 'Not available'}
              </div>

              <div className="payment-summary">
                <h3>Payment Summary</h3>
                <div className="payment-item">
                  <span>Advance Paid:</span>
                  <span>₹{(order.advancePayment ?? 0).toLocaleString()}</span>
                </div>
                <div className="payment-item">
                  <span>Pending Amount:</span>
                  <span>₹{((order.total ?? 0) - (order.advancePayment ?? 0)).toLocaleString()}</span>
                </div>
              </div>
            </div>
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

export default TrackOrder;
