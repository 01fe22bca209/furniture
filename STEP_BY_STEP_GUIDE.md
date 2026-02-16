# Step-by-Step Guide - How to Create Orders & Test All Features

## 📋 Complete Step-by-Step Order Creation Guide

### **Admin Order Creation Process**

#### **Step 1: Login as Admin**
1. Open browser: `http://localhost:3000/admin/login`
2. Enter credentials:
   - **Username:** `admin`
   - **Password:** `admin123`
3. Click **"Login"** button
4. ✅ Should redirect to Dashboard

---

#### **Step 2: Ensure Customer Exists**
**Option A: Use Existing Customer**
- Go to: `http://localhost:3000/admin/customers`
- Note down a customer ID/name

**Option B: Create New Customer**
1. Go to: `http://localhost:3000/admin/customers`
2. Click **"Add New Customer"** button
3. Fill in:
   - **Name:** John Doe
   - **Email:** john@example.com
   - **Phone:** 9876543210
   - **Address:** (optional)
4. Click **"Create Customer"**
5. ✅ Customer created successfully

---

#### **Step 3: Ensure Products Exist**
**Check/Create Products:**
1. Go to: `http://localhost:3000/admin/products`
2. If no products exist, click **"Add New Product"**
3. Fill in:
   - **Product Title:** Wooden Sofa
   - **Category:** Sofa
   - **Description:** Premium quality sofa
   - **Price:** 25000
   - **Stock:** 10
   - **Material:** Oak, Walnut, Maple (checkboxes)
4. Click **"Save"**
5. ✅ Product created

---

#### **Step 4: Create Order (Detailed Steps)**

1. **Navigate to Create Order Page**
   - Go to: `http://localhost:3000/admin/orders`
   - Click **"Create New Order"** button
   - OR directly: `http://localhost:3000/admin/orders/create`

2. **Select Customer (REQUIRED)**
   - In **"Customer"** dropdown
   - Select a customer from the list
   - ⚠️ **MUST select a customer before proceeding**

3. **Add Products to Order**
   - Click **"Add Item"** button
   - In the new row:
     - **Product:** Select from dropdown (e.g., "Wooden Sofa")
     - **Quantity:** Enter number (e.g., 1)
     - **Price:** Auto-filled from product
     - **Subtotal:** Auto-calculated
   - Repeat for multiple products if needed
   - Click **"Remove"** to delete an item

4. **Order Summary (Auto-calculated)**
   - **Subtotal:** Sum of all items
   - **Tax:** Enter amount (optional, e.g., 100)
   - **Discount:** Enter amount (optional, e.g., 50)
   - **Total:** Auto-calculated = Subtotal + Tax - Discount

5. **Delivery Address**
   - **Street:** Enter street address (e.g., "Shree kamaxi nilaya, hubli road, mundgod")
   - **City:** Enter city (e.g., "Mundgod")
   - **State:** Enter state (e.g., "Karnataka")
   - **Zip Code:** Enter postal code (e.g., "581349")

6. **Notes (Optional)**
   - Add any special instructions
   - Example: "Customer prefers delivery in afternoon"

7. **Submit Order**
   - Review all details
   - Click **"Create Order"** button
   - ✅ **Order created successfully!**
   - Should redirect to Orders list page
   - Order Number is **auto-generated** (e.g., ORD-1234567890-123)

---

## 🧪 Testing All Modules - Step by Step

### **Module 1: Customer Management**

1. **Navigate:** `http://localhost:3000/admin/customers`
2. **Test Create:**
   - Click "Add New Customer"
   - Fill form and save
   - ✅ Customer appears in list
3. **Test Edit:**
   - Click "Edit" on any customer
   - Modify details and save
   - ✅ Changes reflected
4. **Test Delete:**
   - Click "Delete" on a customer
   - Confirm deletion
   - ✅ Customer removed

---

### **Module 2: Product Management**

1. **Navigate:** `http://localhost:3000/admin/products`
2. **Test Create:**
   - Click "Add New Product"
   - Fill: Title, Category, Description, Price, Stock
   - Select wood types (checkboxes)
   - Upload image (optional)
   - Click "Save"
   - ✅ Product appears in list
3. **Test Edit:**
   - Click "Edit" on any product
   - Modify and save
   - ✅ Changes reflected
4. **Test Delete:**
   - Click "Delete"
   - ✅ Product removed

---

### **Module 3: Order Management**

1. **Navigate:** `http://localhost:3000/admin/orders`
2. **Test Status Filters:**
   - Click: "Pending", "In Manufacturing", "Delivered", etc.
   - ✅ Orders filter by status
3. **Test Status Change:**
   - Use dropdown in any order row
   - Select new status (e.g., "Processing")
   - ✅ Status updates automatically
4. **Test Order Details:**
   - Click "di" link or "View Details"
   - ✅ Order details page loads
   - Change status using dropdown
   - Click "Save Status"
   - ✅ Status saved

---

### **Module 4: Invoice Management**

1. **Create Invoice from Order:**
   - Go to Order Details page
   - Click **"Generate Invoice"**
   - ✅ Invoice form loads with order data pre-filled
2. **Fill Invoice Details:**
   - **Remaining Amount:** Enter amount
   - **Tax:** Enter tax amount
   - **Delivery Charges:** Enter delivery fee
   - **Total:** Auto-calculated
3. **Actions:**
   - Click **"Download Invoice"** (generates PDF)
   - Click **"Print Invoice"** (print preview)
   - Click **"Share via WhatsApp"** (opens WhatsApp)

---

### **Module 5: Feedback Management**

1. **Customer Submits Feedback:**
   - Go to: `http://localhost:3000/feedback`
   - Fill form: Name, Email, Rating (1-5 stars), Feedback text
   - Click "Submit Feedback"
   - ✅ Success message appears

2. **Admin Views Feedback:**
   - Go to: `http://localhost:3000/admin/feedback`
   - ✅ All feedbacks displayed with ratings
3. **Admin Replies:**
   - Find feedback without reply
   - Type reply in textarea
   - Click "Reply" button
   - ✅ Reply saved and displayed
4. **Toggle Visibility:**
   - Click "Hide" to hide feedback from public
   - Click "Show" to make it visible again

---

### **Module 6: FAQs Management**

1. **Navigate:** `http://localhost:3000/admin/faqs`
2. **Test Create:**
   - Click "Add New FAQ"
   - Fill: Question, Answer, Category, Order number
   - Check "Active" checkbox
   - Click "Create FAQ"
   - ✅ FAQ appears in list
3. **Test Edit:**
   - Click "Edit" on any FAQ
   - Modify and save
   - ✅ Changes reflected
4. **Test Activate/Deactivate:**
   - Click "Deactivate" on active FAQ
   - ✅ FAQ becomes inactive (won't show to customers)
   - Click "Activate" to make it visible again
5. **Test Delete:**
   - Click "Delete"
   - ✅ FAQ removed

---

### **Module 7: Customer-Facing Pages**

1. **Products Page:**
   - Go to: `http://localhost:3000/products`
   - ✅ Products display in grid
   - Click category filters (Sofa, Bed, etc.)
   - ✅ Products filter correctly

2. **Product Detail:**
   - Click "View Details" on any product
   - ✅ Product details page loads
   - Check: Name, Description, Material options, Dimensions
   - Click "Place Order"
   - ✅ Redirects to Place Order page

3. **Place Order (Customer):**
   - Fill form: Customer Name, Phone, Address
   - Add Custom Dimensions (optional)
   - Add Notes (optional)
   - Upload Reference Image (optional)
   - Upload Advance Payment Receipt (optional)
   - Click "Submit Order"
   - ✅ Redirects to Order Success page
   - **Note the Order ID!**

4. **Track Order:**
   - Go to: `http://localhost:3000/track-order`
   - Enter **Order ID** from Step 3
   - Enter **Phone Number** used in order
   - Click "Track"
   - ✅ Order status timeline displays
   - ✅ Payment summary shows

5. **FAQs (Public):**
   - Go to: `http://localhost:3000/faqs`
   - ✅ Only active FAQs display
   - Click on questions to expand answers
   - ✅ Answers toggle correctly

---

## ✅ Complete Testing Checklist

### Customer Pages:
- [ ] Home page loads
- [ ] Products page shows products
- [ ] Category filters work
- [ ] Product detail page displays
- [ ] Place order form works
- [ ] Order success shows Order ID
- [ ] Track order works with Order ID
- [ ] Feedback form submits
- [ ] FAQs expand/collapse
- [ ] Contact form works
- [ ] Gallery displays images (or placeholders)

### Admin Pages:
- [ ] Admin login works
- [ ] Dashboard shows statistics
- [ ] Customer CRUD works (Create, Read, Update, Delete)
- [ ] Product CRUD works
- [ ] Order creation works (NO ERRORS)
- [ ] Order status filters work
- [ ] Order details page loads
- [ ] Status change saves
- [ ] Invoice generation works
- [ ] Feedback list displays
- [ ] Admin can reply to feedback
- [ ] FAQs management works
- [ ] All admin navigation links work

---

## 🐛 Troubleshooting Order Creation Error

**Error:** "orderNumber: Path `orderNumber` is required"

**Solution Applied:**
- ✅ Fixed Order model to auto-generate orderNumber
- ✅ Removed `required: true` constraint (it's auto-generated)
- ✅ Pre-save hook generates orderNumber automatically

**To Verify Fix:**
1. Create a new order following Step 4 above
2. ✅ Order should create WITHOUT error
3. ✅ Order Number should appear as: `ORD-[timestamp]-[random]`

---

## 🎨 Dark/Light Mode Testing

**How to Use:**
1. Toggle button appears in header (when implemented)
2. Click to switch between light/dark themes
3. ✅ All pages update theme consistently

**Pages to Test:**
- [ ] Home page theme changes
- [ ] Admin pages theme changes
- [ ] Forms maintain readability in both modes
- [ ] Tables are readable in both modes
- [ ] Buttons are visible in both modes

---

## 📝 Quick Reference URLs

### Customer Pages:
- Home: `http://localhost:3000/`
- Products: `http://localhost:3000/products`
- Gallery: `http://localhost:3000/gallery`
- Feedback: `http://localhost:3000/feedback`
- FAQs: `http://localhost:3000/faqs`
- Contact: `http://localhost:3000/contact`
- Track Order: `http://localhost:3000/track-order`

### Admin Pages:
- Login: `http://localhost:3000/admin/login`
- Dashboard: `http://localhost:3000/admin`
- Orders: `http://localhost:3000/admin/orders`
- Create Order: `http://localhost:3000/admin/orders/create`
- Products: `http://localhost:3000/admin/products`
- Customers: `http://localhost:3000/admin/customers`
- Feedback: `http://localhost:3000/admin/feedback`
- FAQs: `http://localhost:3000/admin/faqs`
- Invoices: `http://localhost:3000/admin/invoices`

---

**Need Help?** Check TESTING_GUIDE.md for detailed troubleshooting!
