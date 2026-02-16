const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    unique: true,
    required: false
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  items: [{
    productName: String,
    description: String,
    quantity: Number,
    price: Number,
    subtotal: Number
  }],
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled'],
    default: 'Draft'
  },
  dueDate: {
    type: Date
  },
  paidDate: {
    type: Date
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Card', 'Bank Transfer', 'UPI', 'Other']
  }
}, {
  timestamps: true
});

// Generate invoice number before saving
invoiceSchema.pre('save', async function(next) {
  if (!this.invoiceNumber) {
    try {
      const count = await mongoose.model('Invoice').countDocuments();
      this.invoiceNumber = `INV-${Date.now()}-${count + 1}`;
    } catch (error) {
      // Fallback if count fails
      this.invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
  }
  next();
});

module.exports = mongoose.model('Invoice', invoiceSchema);
