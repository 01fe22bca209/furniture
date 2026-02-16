const express = require('express');
const router = express.Router();
const FAQ = require('../models/FAQ');

// Get all FAQs (active only for public, all for admin)
router.get('/', async (req, res) => {
  try {
    const showAll = req.query.all === 'true';
    const query = showAll ? {} : { isActive: true };
    const faqs = await FAQ.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ data: faqs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single FAQ
router.get('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    res.json({ data: faq });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create FAQ
router.post('/', async (req, res) => {
  try {
    const faq = new FAQ(req.body);
    await faq.save();
    res.status(201).json({ data: faq });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update FAQ
router.put('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    res.json({ data: faq });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete FAQ
router.delete('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
