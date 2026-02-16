const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const Invoice = require('../models/Invoice');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const { status, customerId } = req.query;
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (customerId) {
      query.customer = customerId;
    }
    
    const orders = await Order.find(query)
      .populate('customer', 'name email phone')
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer')
      .populate('items.product');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create order
router.post('/', async (req, res) => {
  try {
    const { customer, items, tax = 0, discount = 0, advancePayment = 0, paymentStatus = 'Pending', deliveryAddress, notes } = req.body;
    
    // Calculate totals
    let subtotal = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ error: `Product ${item.product} not found` });
      }

      // No stock checking or deduction – system is order-only
      const itemSubtotal = product.price * item.quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        product: item.product,
        quantity: item.quantity,
        price: product.price,
        subtotal: itemSubtotal
      });
    }
    
    const total = subtotal + tax - discount;
    
    const order = new Order({
      customer,
      items: orderItems,
      subtotal,
      tax,
      discount,
      total,
      advancePayment: advancePayment || 0,
      paymentStatus: advancePayment >= total ? 'Paid' : (advancePayment > 0 ? 'Partial' : (paymentStatus || 'Pending')),
      deliveryAddress,
      notes
    });
    
    await order.save();
    
    const populatedOrder = await Order.findById(order._id)
      .populate('customer')
      .populate('items.product');
    
    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update order
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('customer')
      .populate('items.product');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete order
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
