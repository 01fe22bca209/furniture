const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Feedback = require('../models/Feedback');

const uploadDir = path.join(__dirname, '../uploads/feedback');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname) || '.jpg').toLowerCase();
    cb(null, `feedback-${Date.now()}${ext}`);
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

// Get all feedback (admin)
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json({ data: feedbacks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get customer photos (visible feedbacks with images, for Customer Photos section)
router.get('/photos', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ isVisible: true, imageUrl: { $exists: true, $ne: '' } })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json({ data: feedbacks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create feedback (JSON)
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ data: feedback });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create feedback with image (multipart)
router.post('/with-image', upload.single('image'), async (req, res) => {
  try {
    const body = { ...req.body };
    body.rating = parseInt(body.rating) || 5;
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      body.imageUrl = `${baseUrl}/uploads/feedback/${req.file.filename}`;
    }
    const feedback = new Feedback(body);
    await feedback.save();
    res.status(201).json({ data: feedback });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update feedback (for admin reply)
router.put('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json({ data: feedback });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add admin reply
router.post('/:id/reply', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        adminReply: req.body.reply,
        repliedAt: new Date()
      },
      { new: true }
    );
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json({ data: feedback });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Toggle visibility
router.patch('/:id/visibility', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    feedback.isVisible = !feedback.isVisible;
    await feedback.save();
    res.json({ data: feedback });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
