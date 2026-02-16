import React, { useState, useEffect, useRef } from 'react';
import { getGalleryImages, createGalleryImage, deleteGalleryImage, uploadGalleryImage } from '../services/api';
import './GalleryManagement.css';

const CATEGORIES = ['Sofa', 'Bed', 'Chair', 'Table', 'Cabinet', 'Desk', 'Wardrobe', 'Other'];

const GalleryManagement = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploadMode, setUploadMode] = useState('url');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    category: ''
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await getGalleryImages();
      setImages(response.data || []);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, GIF, WebP).');
      return;
    }
    setUploading(true);
    try {
      const res = await uploadGalleryImage(file);
      const imageUrl = res.data?.imageUrl || res.data?.url;
      if (imageUrl) {
        setFormData((prev) => ({ ...prev, imageUrl }));
      } else {
        alert('Upload failed: no URL returned.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Make sure the backend is running on port 5000 and try again. ' + (error.response?.data?.error || error.message));
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl?.trim()) {
      alert('Please enter an image URL or upload a file from your computer.');
      return;
    }
    try {
      await createGalleryImage(formData);
      fetchImages();
      setFormData({ title: '', imageUrl: '', category: '' });
      setShowForm(false);
      alert('Image added to gallery!');
    } catch (error) {
      console.error('Error adding gallery image:', error);
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this image from the gallery?')) return;
    try {
      await deleteGalleryImage(id);
      fetchImages();
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error deleting image');
    }
  };

  if (loading) {
    return <div className="loading">Loading gallery...</div>;
  }

  return (
    <div className="gallery-management">
      <div className="card">
        <div className="card-header">
          <h2>Gallery Images</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Image to Gallery'}
          </button>
        </div>
        <p className="gallery-management-hint">Images you add here appear on the customer Gallery page and inspire customers.</p>

        {showForm && (
          <form onSubmit={handleSubmit} className="gallery-form">
            <div className="form-group">
              <label>Title (optional)</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Modern Sofa"
              />
            </div>
            <div className="form-group gallery-upload-mode">
              <label>Add image</label>
              <div className="upload-mode-tabs">
                <button type="button" className={uploadMode === 'url' ? 'active' : ''} onClick={() => setUploadMode('url')}>Paste URL</button>
                <button type="button" className={uploadMode === 'file' ? 'active' : ''} onClick={() => setUploadMode('file')}>Upload from computer</button>
              </div>
              {uploadMode === 'url' ? (
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                />
              ) : (
                <div className="file-upload-area">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleFileSelect}
                    className="file-input"
                  />
                  <button type="button" className="btn btn-secondary" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Choose image from your computer'}
                  </button>
                  {formData.imageUrl && <p className="uploaded-url">Image ready: {formData.imageUrl.slice(0, 50)}…</p>}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">— Select —</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary" disabled={!formData.imageUrl?.trim()}>Add to Gallery</button>
          </form>
        )}

        <div className="gallery-management-grid">
          {images.length === 0 ? (
            <p className="empty-state">No gallery images yet. Add images to show on the customer Gallery page.</p>
          ) : (
            images.map((img) => (
              <div key={img._id} className="gallery-management-item">
                <img src={img.imageUrl || img.image} alt={img.title || img.category || 'Gallery'} onError={(e) => { e.target.src = 'https://via.placeholder.com/200x200?text=Image'; }} />
                <div className="gallery-management-item-info">
                  <strong>{img.title || img.category || 'Untitled'}</strong>
                  {img.category && <span>{img.category}</span>}
                </div>
                <button type="button" className="btn btn-sm btn-danger" onClick={() => handleDelete(img._id)}>Remove</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryManagement;
