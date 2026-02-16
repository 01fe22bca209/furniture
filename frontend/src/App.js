import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductsPage from './components/ProductsPage';
import ProductDetail from './components/ProductDetail';
import PlaceOrder from './components/PlaceOrder';
import OrderSuccess from './components/OrderSuccess';
import TrackOrder from './components/TrackOrder';
import Feedback from './components/Feedback';
import FAQs from './components/FAQs';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import GalleryManagement from './components/GalleryManagement';
import Orders from './components/Orders';
import Customers from './components/Customers';
import Invoices from './components/Invoices';
import CreateOrder from './components/CreateOrder';
import CreateInvoice from './components/CreateInvoice';
import AdminLogin from './components/AdminLogin';
import OrderDetails from './components/OrderDetails';
import FeedbackManagement from './components/FeedbackManagement';
import FAQsManagement from './components/FAQsManagement';
import ContactManagement from './components/ContactManagement';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import ViewFeedbackReplies from './components/ViewFeedbackReplies';
import ProtectedRoute from './components/ProtectedRoute';

function BackToHomeHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path !== '/' && !path.startsWith('/admin')) {
        navigate('/', { replace: true });
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);
  return null;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

function AppContent() {
  return (
    <div className="App">
      <BackToHomeHandler />
      <Routes>
        {/* Customer-facing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/view-feedback-replies" element={<ViewFeedbackReplies />} />
        
        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Admin routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Navbar />
              <div className="container">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/gallery" element={<GalleryManagement />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:id" element={<OrderDetails />} />
                  <Route path="/orders/create" element={<CreateOrder />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/invoices/create" element={<CreateInvoice />} />
                  {/* Admin FAQs/Feedback removed as requested */}
                  <Route path="/contact" element={<ContactManagement />} />
                </Routes>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
