import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  // const [formData, setFormData] = useState({
  //   name: '',
  //   description: '',
  //   category: 'Chair',
  //   price: '',
  //   material: '',
  //   color: '',
  //   dimensions: { length: '', width: '', height: '' }
  // });
const [formData, setFormData] = useState({
  name: '',
  description: '',
  category: 'Chair',
  price: '',
  material: '',
  color: '',
  image: '',
  dimensions: { length: '', width: '', height: '' }
});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        dimensions: {
          length: parseFloat(formData.dimensions.length) || undefined,
          width: parseFloat(formData.dimensions.width) || undefined,
          height: parseFloat(formData.dimensions.height) || undefined
        }
      };

      if (editingProduct) {
        await updateProduct(editingProduct._id, data);
      } else {
        await createProduct(data);
      }
      
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      category: product.category,
      price: product.price,
      material: product.material || '',
      color: product.color || '',
      image: product.image || '',
      dimensions: {
        length: product.dimensions?.length || '',
        width: product.dimensions?.width || '',
        height: product.dimensions?.height || ''
      }
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product: ' + (error.response?.data?.error || error.message));
      }
    }
  };

  const resetForm = () => {
  setFormData({
  name: '',
  description: '',
  category: 'Chair',
  price: '',
  material: '',
  color: '',
  image: '',
  dimensions: { length: '', width: '', height: '' }
});

    setEditingProduct(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="products">
      <div className="card">
        <div className="card-header">
          <h2>Products</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add New Product'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-row">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="Chair">Chair</option>
                  <option value="Table">Table</option>
                  <option value="Sofa">Sofa</option>
                  <option value="Bed">Bed</option>
                  <option value="Cabinet">Cabinet</option>
                  <option value="Desk">Desk</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Price (₹) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Material</label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Color</label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
  <label>Image URL</label>
  <input
    type="text"
    placeholder="Paste image URL here"
    value={formData.image}
    onChange={(e) =>
      setFormData({ ...formData, image: e.target.value })
    }
  />
</div>

            <div className="form-row">
              <div className="form-group">
                <label>Length (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.dimensions.length}
                  onChange={(e) => setFormData({
                    ...formData,
                    dimensions: { ...formData.dimensions, length: e.target.value }
                  })}
                />
              </div>
              <div className="form-group">
                <label>Width (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.dimensions.width}
                  onChange={(e) => setFormData({
                    ...formData,
                    dimensions: { ...formData.dimensions, width: e.target.value }
                  })}
                />
              </div>
              <div className="form-group">
                <label>Height (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.dimensions.height}
                  onChange={(e) => setFormData({
                    ...formData,
                    dimensions: { ...formData.dimensions, height: e.target.value }
                  })}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              {editingProduct ? 'Update Product' : 'Create Product'}
            </button>
          </form>
        )}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Material</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">No products found</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>₹{product.price.toLocaleString()}</td>
                    <td>{product.material || '-'}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(product._id)}
                        style={{ marginLeft: '0.5rem' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
