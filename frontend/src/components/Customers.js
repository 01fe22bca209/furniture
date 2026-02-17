import React, { useState, useEffect } from 'react';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../services/api';
import './Customers.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCustomer) {
        await updateCustomer(editingCustomer._id, formData);
      } else {
        await createCustomer(formData);
      }
      
      fetchCustomers();
      resetForm();
    } catch (error) {
      console.error('Error saving customer:', error);
      alert('Error saving customer: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: {
        street: customer.address?.street || '',
        city: customer.address?.city || '',
        state: customer.address?.state || '',
        zipCode: customer.address?.zipCode || '',
        country: customer.address?.country || ''
      }
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(id);
        fetchCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
        alert('Error deleting customer: ' + (error.response?.data?.error || error.message));
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      }
    });
    setEditingCustomer(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="loading">Loading customers...</div>;
  }

  return (
    <div className="customers">
      <div className="card">
        <div className="card-header">
          <h2>Customers</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add New Customer'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="customer-form">
            <div className="form-row">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <h3>Address</h3>
            <div className="form-group">
              <label>Street</label>
              <input
                type="text"
                value={formData.address.street}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, street: e.target.value }
                })}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  value={formData.address.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, city: e.target.value }
                  })}
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  value={formData.address.state}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, state: e.target.value }
                  })}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Zip Code</label>
                <input
                  type="text"
                  value={formData.address.zipCode}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, zipCode: e.target.value }
                  })}
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  value={formData.address.country}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, country: e.target.value }
                  })}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              {editingCustomer ? 'Update Customer' : 'Create Customer'}
            </button>
          </form>
        )}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">No customers found</td>
                </tr>
              ) : (
                customers.map((customer) => (
                 <tr key={customer._id}>
  <td>{customer.name}</td>
  <td>{customer.phone}</td>
  <td>{customer.address?.city || '-'}</td>
  <td>
    <button
      className="btn btn-sm btn-secondary"
      onClick={() => handleEdit(customer)}
    >
      Edit
    </button>
    <button
      className="btn btn-sm btn-danger"
      onClick={() => handleDelete(customer._id)}
      style={{ marginLeft: '8px' }}
    >
      Delete
    </button>
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

export default Customers;
