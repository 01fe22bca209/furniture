# Furniture Order Management and Billing System

A complete MERN (MongoDB, Express, React, Node.js) application for managing furniture orders, customers, products, and billing.

## Features

### Customer-Facing Features
- **Home Page**: Beautiful landing page with hero section, categories, and "Why Choose Us" section
- **Products Gallery**: Browse products by category with filtering
- **Product Details**: View detailed product information with material options and dimensions
- **Place Order**: Submit orders with customer details, custom dimensions, and file uploads
- **Order Tracking**: Track order status with timeline visualization
- **Order Success**: Confirmation page after successful order placement

### Admin Features
- **Dashboard**: Overview of orders, customers, products, and revenue statistics
- **Product Management**: CRUD operations for products
- **Order Management**: View, update, and manage orders with status tracking
- **Customer Management**: Manage customer information
- **Invoice Generation**: Create and manage invoices for orders
- **Billing System**: Track payments and generate invoices

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Styling**: CSS3 with modern design

## Project Structure

```
project_furni/
├── backend/
│   ├── models/
│   │   ├── Product.js
│   │   ├── Customer.js
│   │   ├── Order.js
│   │   └── Invoice.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── customers.js
│   │   ├── orders.js
│   │   └── invoices.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js
│   │   │   ├── ProductsPage.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── PlaceOrder.js
│   │   │   ├── OrderSuccess.js
│   │   │   ├── TrackOrder.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Products.js
│   │   │   ├── Orders.js
│   │   │   ├── Customers.js
│   │   │   └── Invoices.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd project_furni/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/furniture_orders
JWT_SECRET=your_secret_key_here
```

4. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd project_furni/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get single customer
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### Invoices
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/:id` - Get single invoice
- `POST /api/invoices` - Create invoice from order
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice

## Usage

### Customer Flow
1. Visit the home page to browse categories
2. Click on "View Gallery" or navigate to Products
3. Filter products by category
4. Click "View Details" on any product
5. Click "Place Order" to submit an order
6. Fill in the order form and submit
7. Track your order using Order ID and Phone Number

### Admin Flow
1. Navigate to `/admin` routes
2. Use Dashboard to view statistics
3. Manage products, orders, customers, and invoices
4. Generate invoices for completed orders

## Features in Detail

### Order Management
- Automatic order number generation
- Stock management (reduces stock on order creation)
- Order status tracking (Pending, Confirmed, Processing, Shipped, Delivered, Cancelled)
- Payment status tracking

### Invoice System
- Automatic invoice number generation
- Tax and discount calculations
- Payment method tracking
- Due date management

### Product Management
- Category-based organization
- Stock tracking
- Material and dimension specifications
- Image support

## Development

### Adding New Features
1. Create models in `backend/models/`
2. Add routes in `backend/routes/`
3. Create components in `frontend/src/components/`
4. Add API calls in `frontend/src/services/api.js`
5. Update routing in `frontend/src/App.js`

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please contact: kamaxiwood@gmail.com
