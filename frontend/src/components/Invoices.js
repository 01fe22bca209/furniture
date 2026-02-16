import React, { useState, useEffect } from 'react';
import { getInvoices, getInvoice } from '../services/api';
import { generateInvoicePDF } from '../utils/generateInvoicePDF';
import './Invoices.css';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const invoicesRes = await getInvoices();
      setInvoices(invoicesRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleDownloadPDF = async (invoice) => {
    setDownloading(invoice._id);
    try {
      const res = await getInvoice(invoice._id);
      await generateInvoicePDF(res.data);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF: ' + (error.response?.data?.error || error.message));
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return <div className="loading">Loading invoices...</div>;
  }

  return (
    <div className="invoices">
      <div className="card">
        <div className="card-header">
          <h2>Invoices</h2>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Order Number</th>
                <th>Customer</th>
                <th>Amount Due</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">No invoices found</td>
                </tr>
              ) : (
                invoices.map((invoice) => (
                  <tr key={invoice._id}>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.order?.orderNumber || 'N/A'}</td>
                    <td>{invoice.customer?.name || 'N/A'}</td>
                    <td>₹{(invoice.status === 'Paid' ? 0 : (invoice.total ?? 0)).toLocaleString()}</td>
                    <td>
                      <span className={`badge ${invoice.status === 'Paid' ? 'badge-paid' : 'badge-unpaid'}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleDownloadPDF(invoice)}
                        disabled={downloading === invoice._id}
                      >
                        {downloading === invoice._id ? 'Generating...' : 'Download PDF'}
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

export default Invoices;
