import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, getCustomers, createOrder } from '../services/api';
import './CreateOrder.css';

const CreateOrder = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderItems, setOrderItems] = useState([]);
  const [formData, setFormData] = useState({
    customer: '',
    tax: 0,
    discount: 0,
    notes: '',
    deliveryAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, customersRes] = await Promise.all([
        getProducts(),
        getCustomers()
      ]);
      setProducts(productsRes.data);
      setCustomers(customersRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const addItem = () => {
    setOrderItems([...orderItems, { product: '', quantity: 1 }]);
  };

  const removeItem = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const updated = [...orderItems];
    updated[index][field] = value;
    
    if (field === 'product') {
      const product = products.find(p => p._id === value);
      if (product) {
        updated[index].price = product.price;
      }
    }
    
    setOrderItems(updated);
  };

  const calculateSubtotal = () => {
    return orderItems.reduce((sum, item) => {
      const product = products.find(p => p._id === item.product);
      if (product && item.quantity) {
        return sum + (product.price * parseInt(item.quantity));
      }
      return sum;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + parseFloat(formData.tax || 0) - parseFloat(formData.discount || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.customer) {
      alert('Please select a customer');
      return;
    }

    if (orderItems.length === 0) {
      alert('Please add at least one item to the order');
      return;
    }

    // Validate all items have product and quantity
    for (const item of orderItems) {
      if (!item.product || !item.quantity || item.quantity <= 0) {
        alert('Please fill in all item details correctly');
        return;
      }
    }

    try {
      const total = calculateTotal();
      const advancePayment = parseFloat(formData.advancePayment || 0);
      
      const orderData = {
        customer: formData.customer,
        items: orderItems.map(item => ({
          product: item.product,
          quantity: parseInt(item.quantity)
        })),
        tax: parseFloat(formData.tax || 0),
        discount: parseFloat(formData.discount || 0),
        advancePayment: advancePayment,
        paymentStatus: advancePayment >= total ? 'Paid' : (advancePayment > 0 ? 'Partial' : 'Pending'),
        notes: formData.notes,
        deliveryAddress: formData.deliveryAddress
      };

      await createOrder(orderData);
      alert('Order created successfully!');
      navigate('/admin/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order: ' + (error.response?.data?.error || error.message));
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="create-order">
      <div className="card">
        <div className="card-header">
          <h2>Create New Order</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer *</label>
            <select
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              required
            >
              <option value="">Select a customer</option>
              {customers.map(customer => (
                <option key={customer._id} value={customer._id}>
                  {customer.name} - {customer.email}
                </option>
              ))}
            </select>
          </div>

          <div className="order-items-section">
            <div className="section-header">
              <h3>Order Items</h3>
              <button type="button" className="btn btn-secondary" onClick={addItem}>
                Add Item
              </button>
            </div>

            {orderItems.map((item, index) => {
              const selectedProduct = products.find(p => p._id === item.product);
              return (
                <div key={index} className="order-item">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Product *</label>
                      <select
                        value={item.product}
                        onChange={(e) => updateItem(index, 'product', e.target.value)}
                        required
                      >
                        <option value="">Select product</option>
                        {products.map(product => (
                          <option key={product._id} value={product._id}>
                            {product.name} - ₹{product.price} (Stock: {product.stock})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Quantity *</label>
                      <input
                        type="number"
                        min="1"
                        max={selectedProduct?.stock || 999}
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        type="number"
                        value={selectedProduct?.price || 0}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label>Subtotal</label>
                      <input
                        type="number"
                        value={
                          selectedProduct && item.quantity
                            ? (selectedProduct.price * parseInt(item.quantity)).toFixed(2)
                            : 0
                        }
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label>&nbsp;</label>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeItem(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Subtotal</label>
                <input type="number" value={calculateSubtotal().toFixed(2)} disabled />
              </div>
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
              <div className="form-group">
                <label>Total (₹)</label>
                <input type="number" value={calculateTotal().toFixed(2)} disabled />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Advance Payment (₹) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max={calculateTotal()}
                  value={formData.advancePayment}
                  onChange={(e) => setFormData({ ...formData, advancePayment: e.target.value })}
                  required
                  placeholder="Enter advance payment amount"
                />
                <small style={{ color: '#6b7280' }}>Remaining: ₹{(calculateTotal() - parseFloat(formData.advancePayment || 0)).toFixed(2)}</small>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Delivery Address</label>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Street"
                  value={formData.deliveryAddress.street}
                  onChange={(e) => setFormData({
                    ...formData,
                    deliveryAddress: { ...formData.deliveryAddress, street: e.target.value }
                  })}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="City"
                  value={formData.deliveryAddress.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    deliveryAddress: { ...formData.deliveryAddress, city: e.target.value }
                  })}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="State"
                  value={formData.deliveryAddress.state}
                  onChange={(e) => setFormData({
                    ...formData,
                    deliveryAddress: { ...formData.deliveryAddress, state: e.target.value }
                  })}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Zip Code"
                  value={formData.deliveryAddress.zipCode}
                  onChange={(e) => setFormData({
                    ...formData,
                    deliveryAddress: { ...formData.deliveryAddress, zipCode: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Create Order</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/orders')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;
