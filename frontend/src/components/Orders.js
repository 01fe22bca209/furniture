import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getOrders, updateOrder, deleteOrder } from '../services/api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, statusFilter]);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const statusMap = {
    'Pending': 'Pending',
    'In Manufacturing': 'Processing',
    'Ready for Delivery': 'Shipped',
    'Delivered': 'Delivered',
    'Follow-up Required': 'Pending',
    'All': 'All'
  };

  const filterOrders = () => {
    if (statusFilter === 'All') {
      setFilteredOrders(orders);
    } else {
      const mappedStatus = statusMap[statusFilter];
      setFilteredOrders(orders.filter(order => order.status === mappedStatus));
    }
  };

  const handleFilterChange = (filter) => {
    setStatusFilter(filter);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrder(orderId, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(id);
        fetchOrders();
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Error deleting order: ' + (error.response?.data?.error || error.message));
      }
    }
  };

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      'Pending': 'badge-pending',
      'Confirmed': 'badge-confirmed',
      'Processing': 'badge-processing',
      'Shipped': 'badge-shipped',
      'Delivered': 'badge-delivered',
      'Cancelled': 'badge-cancelled'
    };
    return statusMap[status] || 'badge-pending';
  };

  const getPaymentBadgeClass = (status) => {
    return status === 'Paid' ? 'badge-paid' : 'badge-unpaid';
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  const statusFilters = ['Pending', 'In Manufacturing', 'Ready for Delivery', 'Delivered', 'Follow-up Required', 'All'];

  return (
    <div className="orders">
      <div className="card">
        <div className="card-header">
          <h2>Orders</h2>
          <Link to="/admin/orders/create" className="btn btn-primary">Create New Order</Link>
        </div>

        <div className="status-filters">
          {statusFilters.map((filter) => (
            <button
              key={filter}
              className={`status-filter ${statusFilter === filter ? 'active' : ''}`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Product</th>
                <th>Order Date</th>
                <th>Status Dropdown</th>
                <th>Advance Paid</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-state">No orders found</td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderNumber || order._id}</td>
                    <td>{order.customer?.name || 'N/A'}</td>
                    <td>{order.customer?.phone || 'N/A'}</td>
                    <td>{order.items?.[0]?.product?.name || 'Product A'}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>₹{(order.advancePayment || 0).toFixed(2)}</td>
                    <td>
                      <Link to={`/admin/orders/${order._id}`} className="btn-link">
                        di
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
