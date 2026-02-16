# Quick Start Guide - Testing All Pages

## 🚀 Quick Setup (5 minutes)

### Step 1: Start Backend
```bash
cd backend
npm install
npm start
```
✅ Check: Open `http://localhost:5000` - should see API message

### Step 2: Start Frontend (New Terminal)
```bash
cd frontend
npm install
npm start
```
✅ Check: Browser opens to `http://localhost:3000`

---

## 📋 Testing Checklist

### Customer Pages (Frontend)

| Page | URL | What to Test |
|------|-----|--------------|
| **1. Products** | `/products` | ✅ View products, filter by category |
| **2. Product Detail** | `/product/:id` | ✅ View details, click "Place Order" |
| **3. Place Order** | `/place-order` | ✅ Fill form, submit order |
| **4. Order Success** | `/order-success` | ✅ See Order ID, click "Track Order" |
| **5. Track Order** | `/track-order` | ✅ Enter Order ID & phone, view status |
| **Gallery** | `/gallery` | ✅ Browse images by category |
| **Feedback** | `/feedback` | ✅ Submit feedback form |
| **FAQs** | `/faqs` | ✅ View expandable FAQs |
| **Contact** | `/contact` | ✅ Submit contact form |

### Admin Pages (Backend Management)

| Page | URL | Login Credentials |
|------|-----|-------------------|
| **6. Admin Login** | `/admin/login` | Username: `admin`<br>Password: `admin123` |
| **7. Dashboard** | `/admin` | ✅ View stats, quick links |
| **8. Order Details** | `/admin/orders/:id` | ✅ View order, change status |
| **9. Generate Invoice** | `/admin/invoices/create` | ✅ Create invoice from order |
| **10. Products** | `/admin/products` | ✅ Add/edit products |
| **11. FAQs** | `/admin/faqs` | ✅ Manage FAQs |
| **12. Feedback** | `/admin/feedback` | ✅ View & reply to feedback |
| **13. Orders List** | `/admin/orders` | ✅ Filter orders, view details |

---

## 🔄 Complete Flow Test

### Customer Journey:
```
Home → Products → Product Detail → Place Order → Order Success → Track Order
```

### Admin Journey:
```
Login → Dashboard → Orders → Order Details → Change Status → Generate Invoice
```

---

## ⚡ Quick Test Commands

### Test Backend API:
```bash
# Test Products API
curl http://localhost:5000/api/products

# Test Orders API
curl http://localhost:5000/api/orders

# Test Feedback API
curl http://localhost:5000/api/feedback
```

### Test Frontend Routes:
1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab for API calls

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Backend won't start | Check MongoDB is running |
| Frontend can't connect | Verify backend on port 5000 |
| Login not working | Use: `admin` / `admin123` |
| Images not showing | Add images to `frontend/public/images/gallery/` |

---

## 📝 Testing Order

1. ✅ **Start both servers** (backend + frontend)
2. ✅ **Browse products** as customer
3. ✅ **Place an order** (note the Order ID)
4. ✅ **Track the order** using Order ID
5. ✅ **Submit feedback** as customer
6. ✅ **Login as admin**
7. ✅ **View dashboard** stats
8. ✅ **Check orders** list with filters
9. ✅ **View order details** and change status
10. ✅ **Generate invoice** for order
11. ✅ **View customer feedback** and reply
12. ✅ **Manage FAQs** (add/edit/delete)

---

## 🎯 Key Features to Verify

- ✅ Products display and filter correctly
- ✅ Order placement creates order in database
- ✅ Order tracking shows correct status
- ✅ Admin can change order status
- ✅ Invoice generation works
- ✅ Feedback saves and appears in admin panel
- ✅ Admin can reply to feedback
- ✅ FAQs management (CRUD operations)
- ✅ Status filters work on Orders page
- ✅ Dashboard shows correct statistics

---

For detailed testing instructions, see **TESTING_GUIDE.md**
