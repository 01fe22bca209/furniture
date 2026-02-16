import React, { useState, useEffect } from 'react';
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from '../services/api';
import './FAQsManagement.css';

const FAQsManagement = () => {
  const [faqs, setFAQs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await getFAQs(true); // Get all FAQs including inactive
      // API returns { data: [...] }
      setFAQs(response.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFAQ) {
        await updateFAQ(editingFAQ._id, formData);
      } else {
        await createFAQ(formData);
      }
      fetchFAQs();
      resetForm();
    } catch (error) {
      console.error('Error saving FAQ:', error);
      alert('Error saving FAQ: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleEdit = (faq) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || 'General',
      order: faq.order || 0,
      isActive: faq.isActive !== undefined ? faq.isActive : true
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await deleteFAQ(id);
        fetchFAQs();
      } catch (error) {
        console.error('Error deleting FAQ:', error);
        alert('Error deleting FAQ: ' + (error.response?.data?.error || error.message));
      }
    }
  };

  const handleToggleActive = async (faq) => {
    try {
      await updateFAQ(faq._id, { isActive: !faq.isActive });
      fetchFAQs();
    } catch (error) {
      console.error('Error toggling FAQ status:', error);
      alert('Error updating FAQ: ' + (error.response?.data?.error || error.message));
    }
  };

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      order: 0,
      isActive: true
    });
    setEditingFAQ(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="loading">Loading FAQs...</div>;
  }

  return (
    <div className="faqs-management">
      <div className="faqs-header">
        <h1>FAQs Management</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New FAQ'}
        </button>
      </div>

      {showForm && (
        <div className="faq-form-section">
          <h2>{editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}</h2>
          <form onSubmit={handleSubmit} className="faq-form">
            <div className="form-group">
              <label>Question *</label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                required
                placeholder="Enter question"
              />
            </div>

            <div className="form-group">
              <label>Answer *</label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                required
                rows="4"
                placeholder="Enter answer"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="General"
                />
              </div>

              <div className="form-group">
                <label>Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  min="0"
                />
              </div>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                Active (visible to customers)
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              {editingFAQ ? 'Update FAQ' : 'Create FAQ'}
            </button>
          </form>
        </div>
      )}

      <div className="faqs-list">
        {faqs.length === 0 ? (
          <div className="empty-state">No FAQs found. Add your first FAQ above.</div>
        ) : (
          faqs.map((faq) => (
            <div key={faq._id} className={`faq-card ${!faq.isActive ? 'inactive' : ''}`}>
              <div className="faq-content">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
                <div className="faq-meta">
                  <span className="faq-category">Category: {faq.category}</span>
                  <span className="faq-order">Order: {faq.order}</span>
                  <span className={`faq-status ${faq.isActive ? 'active' : 'inactive'}`}>
                    {faq.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="faq-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEdit(faq)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => handleToggleActive(faq)}
                >
                  {faq.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(faq._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FAQsManagement;
