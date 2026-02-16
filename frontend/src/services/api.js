import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '';
const API_URL = API_BASE ? (API_BASE.endsWith('/api') ? API_BASE : API_BASE + '/api') : '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const getProducts = (params = {}) => api.get('/products', { params });
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Customers API
export const getCustomers = () => api.get('/customers');
export const getCustomer = (id) => api.get(`/customers/${id}`);
export const createCustomer = (data) => api.post('/customers', data);
export const updateCustomer = (id, data) => api.put(`/customers/${id}`, data);
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);

// Orders API
export const getOrders = () => api.get('/orders');
export const getOrder = (id) => api.get(`/orders/${id}`);
export const createOrder = (data) => api.post('/orders', data);
export const updateOrder = (id, data) => api.put(`/orders/${id}`, data);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);

// Invoices API
export const getInvoices = () => api.get('/invoices');
export const getInvoice = (id) => api.get(`/invoices/${id}`);
export const createInvoice = (data) => api.post('/invoices', data);
export const updateInvoice = (id, data) => api.put(`/invoices/${id}`, data);
export const deleteInvoice = (id) => api.delete(`/invoices/${id}`);

// Contact messages API
export const getContactMessages = () => api.get('/contact');
export const createContactMessage = (data) => api.post('/contact', data);
export const markContactMessageRead = (id, isRead) =>
  api.patch(`/contact/${id}/read`, { isRead });

// Feedback API
export const getFeedbacks = () => api.get('/feedback');
export const getFeedbackPhotos = () => api.get('/feedback/photos');
export const createFeedback = (data) => api.post('/feedback', data);
export const createFeedbackWithImage = (formData) => {
  const formApi = axios.create({ baseURL: API_URL });
  return formApi.post('/feedback/with-image', formData);
};
export const updateFeedback = (id, data) => api.put(`/feedback/${id}`, data);
export const addFeedbackReply = (id, reply) => api.post(`/feedback/${id}/reply`, { reply });
export const toggleFeedbackVisibility = (id) => api.patch(`/feedback/${id}/visibility`);

// Gallery images API (admin-added images for customer gallery)
export const getGalleryImages = () => api.get('/gallery');
export const createGalleryImage = (data) => api.post('/gallery', data);
export const updateGalleryImage = (id, data) => api.put(`/gallery/${id}`, data);
export const deleteGalleryImage = (id) => api.delete(`/gallery/${id}`);
export const uploadGalleryImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return axios.post(`${API_URL}/gallery/upload`, formData);
};

// FAQs API
export const getFAQs = (showAll = false) => api.get('/faqs', { params: { all: showAll } });
export const getFAQ = (id) => api.get(`/faqs/${id}`);
export const createFAQ = (data) => api.post('/faqs', data);
export const updateFAQ = (id, data) => api.put(`/faqs/${id}`, data);
export const deleteFAQ = (id) => api.delete(`/faqs/${id}`);

export default api;
