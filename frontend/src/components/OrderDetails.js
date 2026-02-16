import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOrder, updateOrder } from '../services/api';
import './OrderDetails.css';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await getOrder(id);
      setOrder(response.data);
      setStatus(response.data.status);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = async () => {
    setSaving(true);
    try {
      await updateOrder(id, { status });
      setOrder({ ...order, status });
      alert('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status: ' + (error.response?.data?.error || error.message));
    } finally {
      setSaving(false);
    }
  };

  const handleWhatsApp = () => {
    const phone = order?.customer?.phone?.replace(/\D/g, '');
    const message = `Hi ${order?.customer?.name}, regarding your order ${order?.orderNumber}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }

  if (!order) {
    return <div className="empty-state">Order not found</div>;
  }

  return (
    <div className="order-details-page">
      <div className="order-details-container">
        <div className="order-details-left">
          <div className="customer-details-section">
            <h2>Customer Details</h2>
            <div className="detail-item">
              <label>Name:</label>
              <span>{order.customer?.name || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <label>Phone:</label>
              <span>{order.customer?.phone || 'N/A'}</span>
              <button className="btn-whatsapp" onClick={handleWhatsApp}>
                WhatsApp
              </button>
            </div>
            <div className="detail-item">
              <label>Address:</label>
              <span>
                {order.deliveryAddress?.street || ''}, {order.deliveryAddress?.city || ''}, 
                {order.deliveryAddress?.state || ''} {order.deliveryAddress?.zipCode || ''}
              </span>
            </div>
            <div className="detail-item">
              <label>Order Notes:</label>
              <span>{order.notes || 'No special instructions.'}</span>
            </div>
          </div>

          <div className="order-details-section">
            <h2>Order Details</h2>
            <div className="detail-item">
              <label>Product:</label>
              <span>{order.items?.[0]?.product?.name || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <label>Dimensions:</label>
              <span>Standard / Custom</span>
            </div>
          </div>
        </div>

        <div className="order-details-right">
          <div className="timeline-section">
            <h2>Timeline</h2>
            <div className="status-controls">
              <label>Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="status-select"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                className="btn-save-status"
                onClick={handleStatusChange}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Status'}
              </button>
            </div>
            <Link to={`/admin/invoices/create?orderId=${id}`} className="btn-generate-invoice">
              Generate Invoice
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
