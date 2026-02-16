const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// Get all contact messages (latest first)
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ data: messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new contact message
router.post('/', async (req, res) => {
  try {
    const message = new ContactMessage(req.body);
    await message.save();
    res.status(201).json({ data: message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mark as read/unread
router.patch('/:id/read', async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: req.body.isRead },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ data: message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

