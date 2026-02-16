# Testing Guide - Furniture Order Management System

This guide will help you test all the features of the application step by step.

## Prerequisites

1. **MongoDB** must be running (local or cloud instance)
2. **Node.js** installed (v14 or higher)
3. **npm** or **yarn** package manager

## Step 1: Start the Backend Server

```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not already installed)
npm install

# Create .env file (if not exists)
# Add these lines:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/furniture_orders
# JWT_SECRET=your_secret_key_here

# Start the backend server
npm start
# OR for development with auto-reload:
npm run dev
```

**Expected Output:**
```
MongoDB connected successfully
Server running on port 5000
```

**Check:** Open browser and go to `http://localhost:5000` - should see: `{"message":"Furniture Order Management API"}`

---

## Step 2: Start the Frontend Server

Open a **NEW terminal window** (keep backend running):

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already installed)
npm install

# Start the frontend development server
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view the app in the browser.
Local: http://localhost:3000
```

**Check:** Browser should automatically open to `http://localhost:3000`

---

## Step 3: Test Customer-Facing Pages (Pages 1-5)

### Page 1: Products Listing Page
1. **URL:** `http://localhost:3000/products`
2. **What to check:**
   - ✅ Category filters are visible (All, Sofa, Bed, Chair, etc.)
   - ✅ Product cards display
   - ✅ Click on category filters - products should filter
   - ✅ Click "View Details" button on any product

### Page 2: Product Detail Page
1. **URL:** `http://localhost:3000/product/:id` (click from products page)
2. **What to check:**
   - ✅ Product image/placeholder displays
   - ✅ Product name, description visible
   - ✅ Material/Wood options shown
   - ✅ Dimensions displayed
   - ✅ "Place Order" button works
   - ✅ "WhatsApp Contact" button works

### Page 3: Place Order Page
1. **URL:** `http://localhost:3000/place-order` (click from product detail)
2. **What to check:**
   - ✅ Form fields: Product Name, Customer Name, Phone, Address
   - ✅ Custom Dimensions field (optional)
   - ✅ Additional Notes field
   - ✅ Upload Reference Image (optional)
   - ✅ Upload Advance Payment Receipt (optional)
   - ✅ Fill form and click "Submit Order"
   - ✅ Should redirect to Order Success page

### Page 4: Order Success Page
1. **URL:** `http://localhost:3000/order-success`
2. **What to check:**
   - ✅ "Your Order Has Been Placed Successfully" message
   - ✅ Order ID displayed
   - ✅ Expected Delivery date shown
   - ✅ "Track Order" button works
   - ✅ "Contact on WhatsApp" button works

### Page 5: Track Order Page
1. **URL:** `http://localhost:3000/track-order`
2. **What to check:**
   - ✅ Form with Order ID and Mobile Number fields
   - ✅ Enter Order ID from Step 4
   - ✅ Enter phone number used in order
   - ✅ Click "Track" button
   - ✅ Order status timeline displays
   - ✅ Payment summary shows (Advance Paid, Pending Amount)

### Additional Customer Pages:
- **Gallery:** `http://localhost:3000/gallery` - Check category filters and image grid
- **Feedback:** `http://localhost:3000/feedback` - Submit feedback form
- **FAQs:** `http://localhost:3000/faqs` - View expandable FAQ items
- **Contact:** `http://localhost:3000/contact` - Submit contact form

---

## Step 4: Test Admin Pages (Pages 6-13)

### Page 6: Admin Login
1. **URL:** `http://localhost:3000/admin/login`
2. **Credentials:**
   - Username: `admin`
   - Password: `admin123`
3. **What to check:**
   - ✅ Login form displays
   - ✅ Enter credentials and click "Login"
   - ✅ Should redirect to `/admin` (Dashboard)

### Page 7: Admin Dashboard
1. **URL:** `http://localhost:3000/admin`
2. **What to check:**
   - ✅ "Dashboard" heading visible
   - ✅ Four stat cards with colors:
     - Blue: Total Orders
     - Yellow: Orders in Progress
     - Green: Completed Orders
     - Red: Follow-up Required
   - ✅ Quick Links section:
     - "Add Product to Gallery" button
     - "View Pending Orders" button
   - ✅ Navbar shows: Dashboard, Orders, Customers, Gallery, Feedback, FAQs, Billing, Logout

### Page 8: Order Details/Review Page
1. **URL:** `http://localhost:3000/admin/orders` (first, go to Orders list)
2. **Steps:**
   - Click on any order's "di" link or "View Details"
   - **URL:** `http://localhost:3000/admin/orders/:id`
3. **What to check:**
   - ✅ Left side: Customer Details section
     - Customer Name, Phone (with WhatsApp button)
     - Address
     - Order Notes
   - ✅ Order Details section:
     - Product name
     - Dimensions
     - Reference Image placeholder
     - Advance Payment Receipts placeholders
   - ✅ Right side: Timeline section
     - Status dropdown (Pending, Confirmed, Processing, etc.)
     - "Save Status" button
     - "Generate Invoice" button
   - ✅ Change status and click "Save Status" - should update

### Page 9: Customer Details with Invoice
1. **From Order Details page:**
   - Click "Generate Invoice" button
   - **URL:** `http://localhost:3000/admin/invoices/create?orderId=:id`
2. **What to check:**
   - ✅ Order details auto-filled
   - ✅ Customer info displayed
   - ✅ Product details shown
   - ✅ Advance Paid amount displayed
   - ✅ Fields for: Remaining Amount, Tax, Delivery Charges
   - ✅ Total Amount calculated automatically
   - ✅ Buttons: Download Invoice, Print Invoice, Share via WhatsApp

### Page 10: Product/Gallery Management
1. **URL:** `http://localhost:3000/admin/products`
2. **What to check:**
   - ✅ Products list displays
   - ✅ "Add New Product" button works
   - ✅ Form fields: Product Title, Category, Description
   - ✅ Upload Image(s) section
   - ✅ Wood Type checkboxes (Oak, Maple, Pine, Walnut)
   - ✅ Customization checkbox
   - ✅ Create/Edit/Delete products works

### Page 11: FAQs Management
1. **URL:** `http://localhost:3000/admin/faqs`
2. **What to check:**
   - ✅ FAQs list displays
   - ✅ "Add New FAQ" button works
   - ✅ Form: Question, Answer, Category, Order
   - ✅ Active/Inactive toggle
   - ✅ Edit FAQ works
   - ✅ Delete FAQ works
   - ✅ Activate/Deactivate FAQ works

### Page 12: Feedback Management
1. **URL:** `http://localhost:3000/admin/feedback`
2. **What to check:**
   - ✅ Feedback list displays (from customer submissions)
   - ✅ Sort by Date/Rating dropdown works
   - ✅ Each feedback shows:
     - Title, Date, Rating (stars)
     - Customer name, email, phone
     - Feedback text
   - ✅ Reply section for each feedback
   - ✅ "Reply" button saves admin reply
   - ✅ "Hide/Show" button toggles visibility
   - ✅ Admin replies display with timestamp

### Page 13: Invoice Management (Billing)
1. **URL:** `http://localhost:3000/admin/invoices`
2. **What to check:**
   - ✅ Invoices list displays
   - ✅ Invoice details: Order ID, Customer, Amount, Status
   - ✅ Create new invoice button
   - ✅ View/Edit/Delete invoices

### Additional Admin Pages:
- **Orders List:** `http://localhost:3000/admin/orders`
  - ✅ Status filter buttons work (Pending, In Manufacturing, Ready for Delivery, etc.)
  - ✅ Table shows: Order ID, Customer Name, Phone, Product, Order Date, Status Dropdown, Advance Paid, Action
  - ✅ Status dropdown changes order status
  - ✅ "di" link goes to Order Details

- **Customers:** `http://localhost:3000/admin/customers`
  - ✅ Customer list displays
  - ✅ Add/Edit/Delete customers works

---

## Step 5: Complete End-to-End Flow Test

### Customer Flow:
1. **Browse Products** → `http://localhost:3000/products`
2. **View Product Details** → Click "View Details"
3. **Place Order** → Fill form, submit
4. **Order Success** → Note Order ID
5. **Track Order** → Enter Order ID and phone number
6. **Submit Feedback** → `http://localhost:3000/feedback`
7. **View FAQs** → `http://localhost:3000/faqs`

### Admin Flow:
1. **Login** → `http://localhost:3000/admin/login`
2. **View Dashboard** → Check statistics
3. **View Orders** → See all orders with filters
4. **Review Order** → Click "di" to view order details
5. **Update Status** → Change order status
6. **Generate Invoice** → Create invoice for order
7. **View Feedback** → Check customer feedback, reply if needed
8. **Manage FAQs** → Add/edit FAQs
9. **Manage Products** → Add products to gallery

---

## Step 6: Backend API Testing (Optional)

Test API endpoints directly using Postman or curl:

### Products API:
```bash
# Get all products
curl http://localhost:5000/api/products

# Get single product
curl http://localhost:5000/api/products/:id
```

### Orders API:
```bash
# Get all orders
curl http://localhost:5000/api/orders

# Get single order
curl http://localhost:5000/api/orders/:id
```

### Feedback API:
```bash
# Get all feedback
curl http://localhost:5000/api/feedback

# Create feedback
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","rating":5,"feedback":"Great service!"}'
```

### FAQs API:
```bash
# Get all FAQs
curl http://localhost:5000/api/faqs

# Create FAQ
curl -X POST http://localhost:5000/api/faqs \
  -H "Content-Type: application/json" \
  -d '{"question":"Test Question?","answer":"Test Answer"}'
```

---

## Common Issues & Solutions

### Issue 1: Backend not connecting to MongoDB
**Solution:** 
- Check if MongoDB is running: `mongod` or check MongoDB service
- Verify MONGODB_URI in `.env` file
- Check MongoDB connection string format

### Issue 2: Frontend can't connect to backend
**Solution:**
- Check backend is running on port 5000
- Verify `REACT_APP_API_URL` in frontend `.env` (default: `http://localhost:5000/api`)
- Check CORS settings in backend

### Issue 3: Pages show "Loading..." forever
**Solution:**
- Check browser console for errors (F12)
- Verify API endpoints are correct
- Check network tab for failed requests

### Issue 4: Admin login not working
**Solution:**
- Default credentials: username: `admin`, password: `admin123`
- Check localStorage in browser DevTools
- Clear localStorage and try again

### Issue 5: Images not displaying
**Solution:**
- Images are placeholders - add actual images to `frontend/public/images/gallery/`
- Check image paths in Gallery component
- Verify image file names match Gallery.js expectations

---

## Quick Test Checklist

- [ ] Backend server starts successfully
- [ ] Frontend server starts successfully
- [ ] Home page loads
- [ ] Products page shows products
- [ ] Product detail page displays
- [ ] Place order form works
- [ ] Order success page shows
- [ ] Track order works with Order ID
- [ ] Admin login works
- [ ] Admin dashboard displays stats
- [ ] Orders list shows with filters
- [ ] Order details page loads
- [ ] Status change saves
- [ ] Invoice generation works
- [ ] Feedback submission works
- [ ] Feedback appears in admin panel
- [ ] Admin can reply to feedback
- [ ] FAQs management works
- [ ] Products management works

---

## Next Steps After Testing

1. **Add Real Data:**
   - Add actual product images to `frontend/public/images/gallery/`
   - Create sample products in admin panel
   - Add sample FAQs

2. **Customize:**
   - Update company information (phone, email, address)
   - Customize colors and branding
   - Add more product categories

3. **Deploy:**
   - Deploy backend to Heroku/Railway/DigitalOcean
   - Deploy frontend to Vercel/Netlify
   - Update API URLs in production

---

## Support

If you encounter any issues:
1. Check browser console (F12) for errors
2. Check backend terminal for error messages
3. Verify MongoDB connection
4. Check all environment variables are set correctly

Happy Testing! 🚀
