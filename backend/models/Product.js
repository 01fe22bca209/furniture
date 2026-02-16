const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Chair', 'Table', 'Sofa', 'Bed', 'Cabinet', 'Desk', 'Other']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: false,
    min: 0,
    default: 0
  },
  image: {
    type: String,
    default: ''
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  material: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
