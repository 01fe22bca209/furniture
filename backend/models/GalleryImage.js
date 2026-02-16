const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: ''
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    trim: true,
    enum: ['', 'Sofa', 'Bed', 'Chair', 'Table', 'Cabinet', 'Desk', 'Wardrobe', 'Other'],
    default: ''
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
