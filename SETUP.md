# Setup – Furniture Order Management

Use this when running the project in a **new environment** (another PC, without dependencies/MongoDB installed yet).

---

## 1. Install dependencies

**Backend**

```bash
cd backend
npm install
```

**Frontend**

```bash
cd frontend
npm install
```

---

## 2. MongoDB

The backend needs a running MongoDB.

- **Local:** Install [MongoDB](https://www.mongodb.com/try/download/community) and start it, or use Docker.
- **Cloud:** Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and get the connection string.

---

## 3. Environment variables

**Backend**

```bash
cd backend
# Copy the example and edit
copy .env.example .env   # Windows
# cp .env.example .env   # Mac/Linux
```

Edit `backend/.env`:

- `MONGODB_URI` – Your MongoDB URL (e.g. `mongodb://localhost:27017/furniture_orders` or your Atlas URI).
- `PORT` – Optional; default is `5000`.

**Frontend**

- If the backend runs on the same machine and port 5000, you don’t need a frontend `.env` (the dev server proxy will use `http://localhost:5000`).
- If the API is elsewhere, create `frontend/.env` and set:
  - `REACT_APP_API_URL=http://your-backend-url` (no `/api` at the end).

---

## 4. Run the app

**Terminal 1 – Backend**

```bash
cd backend
npm start
```

You should see: `MongoDB connected successfully` and `Server running on port 5000`.  
If you see **MongoDB connection error**, check that MongoDB is running and `MONGODB_URI` in `.env` is correct.

**Terminal 2 – Frontend**

```bash
cd frontend
npm start
```

Browser will open at `http://localhost:3000`.

---

## Common errors

| Error | What to do |
|-------|------------|
| **MongoDB connection error** | Start MongoDB locally or set correct `MONGODB_URI` in `backend/.env`. |
| **Cannot find module 'xxx'** | Run `npm install` in `backend` and in `frontend`. |
| **Network Error / ECONNREFUSED** (frontend can’t reach API) | Start the backend first. If API is on another URL, set `REACT_APP_API_URL` in `frontend/.env`. |
| **DeprecationWarning: fs.F_OK** | Already fixed in the codebase (use `fs.constants.F_OK`). If it still appears, it may be from `node_modules`; updating `react-scripts` can help. |

---

## Running “in another” place

- **Same machine:** Install deps in both folders, set `backend/.env` with your MongoDB URI, then run backend then frontend as above.
- **Backend on another PC/server:** Put the backend there with its own `.env` and MongoDB. On the frontend machine, set `REACT_APP_API_URL` to that backend URL (and ensure CORS/network allow requests from the frontend).
