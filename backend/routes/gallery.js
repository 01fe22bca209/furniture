const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const GalleryImage = require('../models/GalleryImage');

const uploadDir = path.join(__dirname, '../uploads/gallery');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname) || '.jpg').toLowerCase();
    cb(null, `gallery-${Date.now()}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /image\/(jpeg|jpg|png|gif|webp)/;
    if (allowed.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files (JPEG, PNG, GIF, WebP) are allowed.'));
  }
});

// Upload image from local file (admin)
router.post('/upload', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ error: 'File too large (max 5MB)' });
      return res.status(400).json({ error: err.message || 'Upload failed' });
    }
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imageUrl = `${baseUrl}/uploads/gallery/${req.file.filename}`;
    res.status(201).json({ imageUrl });
  });
});

// Get all gallery images (customer + admin)
router.get('/', async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ order: 1, createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create gallery image (admin)
router.post('/', async (req, res) => {
  try {
    const { title, imageUrl, image, category, order } = req.body;
    const url = imageUrl || image || '';
    const imageDoc = new GalleryImage({
      title: title || '',
      imageUrl: url,
      category: category || '',
      order: order || 0
    });
    await imageDoc.save();
    res.status(201).json(imageDoc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update gallery image (admin)
router.put('/:id', async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!image) {
      return res.status(404).json({ error: 'Gallery image not found' });
    }
    res.json(image);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete gallery image (admin)
router.delete('/:id', async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Gallery image not found' });
    }
    res.json({ message: 'Gallery image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
