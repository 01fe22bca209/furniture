import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('orderId') || 'ORD-12345';

  const handleTrackOrder = () => {
    navigate(`/track-order?orderId=${orderId}`);
  };

  const handleWhatsApp = () => {
    const message = `Hi, I just placed an order ${orderId}. Can you provide an update?`;
    window.open(`https://wa.me/919449125666?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="order-success-page">
      <div className="success-card">
        <h1>Your Order Has Been Placed Successfully</h1>
        <div className="order-info">
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Expected Delivery:</strong> Date (based on category)</p>
        </div>
        <div className="success-actions">
          <button className="btn btn-track" onClick={handleTrackOrder}>
            Track Order
          </button>
          <button className="btn btn-whatsapp-contact" onClick={handleWhatsApp}>
            Contact on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
