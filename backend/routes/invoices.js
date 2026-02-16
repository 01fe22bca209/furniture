const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const Order = require('../models/Order');

// Get all invoices
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
    
    const invoices = await Invoice.find(query)
      .populate('customer', 'name email phone address')
      .populate('order', 'orderNumber deliveryAddress')
      .sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single invoice
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('customer')
      .populate({ path: 'order', populate: { path: 'items.product' } });
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create invoice from order
router.post('/', async (req, res) => {
  try {
    const { orderId, tax = 0, discount = 0, dueDate, paymentMethod } = req.body;
    
    const order = await Order.findById(orderId)
      .populate('customer')
      .populate('items.product');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Check if invoice already exists for this order
    const existingInvoice = await Invoice.findOne({ order: orderId });
    if (existingInvoice) {
      return res.status(400).json({ error: 'Invoice already exists for this order' });
    }
    
    // Prepare invoice items
    const invoiceItems = order.items.map(item => ({
      productName: item.product.name,
      description: item.product?.description || 'Custom size / material',
      quantity: item.quantity,
      price: item.price,
      subtotal: item.subtotal
    }));
    
    const subtotal = order.subtotal;
    const total = subtotal + tax - discount;
    
    const invoice = new Invoice({
      order: orderId,
      customer: order.customer._id,
      items: invoiceItems,
      subtotal,
      tax,
      discount,
      total,
      dueDate,
      paymentMethod
    });
    
    await invoice.save();
    
    const populatedInvoice = await Invoice.findById(invoice._id)
      .populate('customer')
      .populate('order');
    
    res.status(201).json(populatedInvoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update invoice
router.put('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('customer')
      .populate('order');
    
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    // Update order payment status if invoice is paid
    if (invoice.status === 'Paid' && invoice.paidDate) {
      await Order.findByIdAndUpdate(invoice.order._id, {
        paymentStatus: 'Paid'
      });
    }
    
    res.json(invoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete invoice
router.delete('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
