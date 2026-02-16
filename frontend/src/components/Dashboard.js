import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getOrders, getCustomers, getInvoices } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    invoices: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes, customersRes, invoicesRes] = await Promise.all([
        getProducts(),
        getOrders(),
        getCustomers(),
        getInvoices()
      ]);

      const orders = ordersRes.data;
      const invoices = invoicesRes.data;

      const totalRevenue = invoices
        .filter(inv => inv.status === 'Paid')
        .reduce((sum, inv) => sum + inv.total, 0);

      const pendingOrders = orders.filter(order => order.status === 'Pending').length;

      setStats({
        products: productsRes.data.length,
        orders: orders.length,
        customers: customersRes.data.length,
        invoices: invoices.length,
        totalRevenue,
        pendingOrders
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card stat-card-blue">
          <h3>Total Orders</h3>
          <div className="stat-value">{stats.orders}</div>
        </div>
        <div className="stat-card stat-card-blue">
          <h3>Orders in Progress</h3>
          <div className="stat-value">{stats.orders - stats.pendingOrders}</div>
        </div>
        <div className="stat-card stat-card-blue">
          <h3>Completed Orders</h3>
          <div className="stat-value">{stats.orders - stats.pendingOrders}</div>
        </div>
        <div className="stat-card stat-card-blue">
          <h3>Follow-up Required</h3>
          <div className="stat-value">{stats.pendingOrders}</div>
        </div>
      </div>
      <div className="quick-actions">
        <h2>Quick Links</h2>
        <div className="action-buttons">
          <Link to="/admin/products" className="btn btn-primary">Add Product to Gallery</Link>
          <Link to="/admin/orders" className="btn btn-secondary">View Pending Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
