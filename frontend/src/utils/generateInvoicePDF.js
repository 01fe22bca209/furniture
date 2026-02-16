import { jsPDF } from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';

applyPlugin(jsPDF);

const HEADER_COLOR = [114, 47, 55]; // dark reddish-brown
const GRAY = [100, 100, 100];

function loadImageAsBase64(url) {
  return fetch(url, { mode: 'cors' })
    .then((res) => res.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    )
    .catch(() => null);
}

function formatDate(d) {
  if (!d) return '—';
  const date = new Date(d);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatRs(num) {
  return `Rs ${Number(num).toFixed(2)}`;
}

export async function generateInvoicePDF(invoice) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = 14;

  // ----- HEADER: Logo + company name (left) -----
  try {
    const logoUrl = `${window.location.origin}/logo.png`;
    const imgData = await loadImageAsBase64(logoUrl);
    if (imgData) {
      doc.addImage(imgData, 'PNG', margin, 10, 22, 14);
      y = 26;
    }
  } catch (e) {}
  doc.setFontSize(14);
  doc.setTextColor(...HEADER_COLOR);
  doc.setFont(undefined, 'bold');
  doc.text('Kamaxi', margin, y);
  doc.setFont(undefined, 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.text('WOOD CREATIONS', margin, y + 5);

  // ----- Company address + GSTIN (right, top) -----
  const addrRight = pageWidth - margin;
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.text('Hubli Road, Mundgod - 581349', addrRight, 14, { align: 'right' });
  doc.text('Karnataka, India', addrRight, 19, { align: 'right' });
  doc.text('GSTIN: 29XXXXXXXXXXX', addrRight, 24, { align: 'right' });

  y = 38;

  // ----- INVOICE heading -----
  doc.setFontSize(16);
  doc.setTextColor(...HEADER_COLOR);
  doc.setFont(undefined, 'bold');
  doc.text('INVOICE', margin, y);
  y += 10;

  // ----- Left: Invoice No, Order ID, Date -----
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Invoice No: ${invoice.invoiceNumber || 'N/A'}`, margin, y);
  y += 6;
  doc.text(`Order ID: ${invoice.order?.orderNumber || 'N/A'}`, margin, y);
  y += 6;
  doc.text(`Date: ${formatDate(invoice.createdAt)}`, margin, y);

  // ----- Right: Customer, Phone, Shipping address -----
  const customer = invoice.customer || {};
  const customerName = customer.name || 'N/A';
  const customerPhone = customer.phone || '—';
  const shippingAddress =
    customer.address ||
    (typeof invoice.order?.deliveryAddress === 'string'
      ? invoice.order.deliveryAddress
      : invoice.order?.deliveryAddress?.fullAddress || '—');

  let yRight = 44;
  doc.text(`Customer: ${customerName}`, addrRight, yRight, { align: 'right' });
  yRight += 6;
  doc.text(`Phone: ${customerPhone}`, addrRight, yRight, { align: 'right' });
  yRight += 6;
  const addrLines = doc.splitTextToSize(String(shippingAddress), 70);
  addrLines.forEach((line) => {
    doc.text(line, addrRight, yRight, { align: 'right' });
    yRight += 5;
  });

  // Start table after the higher of the two columns
  y = Math.max(y, yRight) + 8;

  // ----- Itemized table: Furniture Item | Description | Qty | Rate | Amount -----
  const tableHeaders = ['Furniture Item', 'Description', 'Qty', 'Rate', 'Amount'];
  const tableRows = (invoice.items || []).map((item) => [
    item.productName || '—',
    item.description || 'Custom size / material',
    String(item.quantity ?? 0),
    formatRs(item.price ?? 0),
    formatRs(item.subtotal ?? 0),
  ]);

  doc.autoTable({
    startY: y,
    head: [tableHeaders],
    body: tableRows,
    theme: 'plain',
    headStyles: {
      fillColor: HEADER_COLOR,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 35 },
      1: { cellWidth: 45 },
      2: { cellWidth: 15 },
      3: { cellWidth: 35 },
      4: { cellWidth: 35 },
    },
    margin: { left: margin },
    tableWidth: pageWidth - 2 * margin,
  });

  y = doc.lastAutoTable.finalY + 8;

  // ----- Summary: Subtotal, CGST, SGST, Discount, Grand Total (right-aligned) -----
  const subtotal = invoice.subtotal ?? 0;
  const tax = invoice.tax ?? 0;
  const discount = invoice.discount ?? 0;
  const total = invoice.total ?? subtotal + tax - discount;
  const cgst = tax / 2;
  const sgst = tax / 2;

  const summaryX = pageWidth - margin;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  doc.text('Subtotal:', summaryX - 45, y);
  doc.text(formatRs(subtotal), summaryX, y, { align: 'right' });
  y += 6;

  if (tax > 0) {
    doc.text('CGST (9%):', summaryX - 45, y);
    doc.text(formatRs(cgst), summaryX, y, { align: 'right' });
    y += 6;
    doc.text('SGST (9%):', summaryX - 45, y);
    doc.text(formatRs(sgst), summaryX, y, { align: 'right' });
    y += 6;
  }

  if (discount > 0) {
    doc.text('Discount:', summaryX - 45, y);
    doc.text(`- ${formatRs(discount)}`, summaryX, y, { align: 'right' });
    y += 6;
  }

  doc.setFont(undefined, 'bold');
  doc.setFontSize(11);
  doc.text('Grand Total:', summaryX - 45, y);
  doc.text(formatRs(total), summaryX, y, { align: 'right' });
  y += 12;

  // ----- Footer -----
  const footerY = Math.min(y + 5, doc.internal.pageSize.getHeight() - 20);
  doc.setFont(undefined, 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.text(`Payment Status: ${invoice.status || 'Draft'}`, margin, footerY);
  doc.setTextColor(0, 0, 0);
  doc.text('Thank you for your order!', pageWidth / 2, footerY, { align: 'center' });
  doc.text('Authorized Signature', summaryX, footerY, { align: 'right' });

  const fileName = `Invoice_${(invoice.invoiceNumber || 'invoice').replace(/\s/g, '_')}.pdf`;
  doc.save(fileName);
}
