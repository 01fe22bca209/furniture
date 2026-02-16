import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomerNav from './CustomerNav';
import CustomerFooter from './CustomerFooter';
import './FAQs.css';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What types of furniture do you offer?',
      answer: 'We offer a wide range of custom-made furniture including sofas, beds, chairs, tables, wardrobes, cabinets, and more. All our furniture is built according to your design preferences.'
    },
    {
      question: 'How long does it take to complete an order?',
      answer: 'The completion time depends on the complexity and size of your order. Generally, simple items take 1-2 weeks, while larger pieces like wardrobes or complete sets may take 3-4 weeks. We will provide an estimated timeline when you place your order.'
    },
    {
      question: 'Do you offer delivery services?',
      answer: 'Yes, we offer delivery services to various locations. Delivery time and charges may vary based on your location. Please contact us for more details about delivery to your area.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept multiple payment methods including cash, bank transfers, UPI, and card payments. Payment terms can be discussed during order placement, and we typically require a partial advance payment.'
    },
    {
      question: 'Can I customize the design of my furniture?',
      answer: 'Absolutely! We specialize in custom-made furniture. You can provide your design ideas, dimensions, and preferences, and our skilled craftsmen will bring your vision to life.'
    },
    {
      question: 'What materials do you use?',
      answer: 'We use premium quality wood including teak, mahogany, oak, and other high-grade materials. All materials are carefully selected for durability, quality, and aesthetic appeal.'
    },
    {
      question: 'Do you provide warranty on furniture?',
      answer: 'Yes, we provide warranty on all our furniture products. The warranty period varies depending on the type of furniture. Details will be provided in your invoice and order documentation.'
    },
    {
      question: 'How can I track my order?',
      answer: 'You can track your order using the "Track Order" feature on our website. Simply enter your order number to see the current status and estimated completion date.'
    },
    {
      question: 'What if I need to cancel or modify my order?',
      answer: 'Please contact us as soon as possible if you need to cancel or modify your order. Cancellation policies depend on the production stage. We recommend contacting us within 24-48 hours of placing your order for easier modifications.'
    },
    {
      question: 'Do you offer repair and maintenance services?',
      answer: 'Yes, we offer repair and maintenance services for furniture purchased from us. Please contact us with details about the issue, and we will schedule a visit to assess and fix the problem.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faqs-page">
      <CustomerNav />

      <div className="faqs-container">
        <div className="faqs-content">
          <h1>Frequently Asked Questions</h1>
          <p className="faqs-subtitle">Find answers to common questions about our furniture and services</p>

          <div className="faqs-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${openIndex === index ? 'open' : ''}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
                </button>
                {openIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="faqs-contact">
            <h3>Still have questions?</h3>
            <p>Feel free to contact us directly and we'll be happy to help!</p>
            <Link to="/contact" className="btn-contact">Contact Us</Link>
          </div>

          <div className="back-button-section">
            <Link to="/" className="btn-back">← Back to Home</Link>
          </div>
        </div>
      </div>

      <CustomerFooter />
    </div>
  );
};

export default FAQs;
