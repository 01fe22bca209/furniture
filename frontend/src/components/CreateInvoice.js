import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders, createInvoice } from '../services/api';
import './CreateInvoice.css';

const CreateInvoice = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    tax: 0,
    discount: 0,
    dueDate: '',
    paymentMethod: ''
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      // Filter orders that don't have invoices yet
      const ordersWithoutInvoices = response.data.filter(order => 
        order.status !== 'Cancelled'
      );
      setOrders(ordersWithoutInvoices);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleOrderSelect = (orderId) => {
    const order = orders.find(o => o._id === orderId);
    setSelectedOrder(order);
    if (order) {
      setFormData({
        tax: order.tax || 0,
        discount: order.discount || 0,
        dueDate: '',
        paymentMethod: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedOrder) {
      alert('Please select an order');
      return;
    }

    try {
      const invoiceData = {
        orderId: selectedOrder._id,
        tax: parseFloat(formData.tax || 0),
        discount: parseFloat(formData.discount || 0),
        dueDate: formData.dueDate || undefined,
        paymentMethod: formData.paymentMethod || undefined
      };

      await createInvoice(invoiceData);
      alert('Invoice created successfully!');
      navigate('/admin/invoices');
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('Error creating invoice: ' + (error.response?.data?.error || error.message));
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="create-invoice">
      <div className="card">
        <div className="card-header">
          <h2>Generate Invoice</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Order *</label>
            <select
              value={selectedOrder?._id || ''}
              onChange={(e) => handleOrderSelect(e.target.value)}
              required
            >
              <option value="">Select an order</option>
              {orders.map(order => (
                <option key={order._id} value={order._id}>
                  {order.orderNumber} - {order.customer?.name} - ₹{order.total}
                </option>
              ))}
            </select>
          </div>

          {selectedOrder && (
            <>
              <div className="order-preview">
                <h3>Order Preview</h3>
                <p><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
                <p><strong>Customer:</strong> {selectedOrder.customer?.name}</p>
                <p><strong>Subtotal:</strong> ₹{selectedOrder.subtotal}</p>
                <p><strong>Items:</strong> {selectedOrder.items?.length || 0}</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tax (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.tax}
                    onChange={(e) => setFormData({ ...formData, tax: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Discount (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  >
                    <option value="">Select payment method</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="UPI">UPI</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="total-preview">
                <p><strong>Total Amount:</strong> ₹{
                  (selectedOrder.subtotal + parseFloat(formData.tax || 0) - parseFloat(formData.discount || 0)).toFixed(2)
                }</p>
              </div>
            </>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={!selectedOrder}>
              Generate Invoice
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/invoices')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;
