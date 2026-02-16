# Deploy to Vercel - Step by Step Guide

This project has a **React frontend** and **Node.js/Express backend**. Vercel is best for frontend deployment. For full functionality, you'll need to deploy the backend separately (e.g., Railway, Render, or MongoDB Atlas + serverless).

---

## Option A: Frontend Only (Vercel) + Backend on Railway/Render

### Step 1: Prepare the Frontend

1. Open `frontend/package.json` and ensure `"proxy": "http://localhost:5000"` is removed or replaced for production.
2. Create `frontend/.env.production` (or set in Vercel dashboard):
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app/api
   ```
   Replace with your actual backend URL after deploying it.

### Step 2: Push Code to GitHub

```bash
cd "c:\BMSCE\movie2\project_furni (1)\project_furni"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 3: Deploy Frontend to Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign in (use GitHub).
2. Click **Add New** → **Project**.
3. Import your GitHub repository.
4. Configure the project:
   - **Root Directory:** `frontend` (or `project_furni/frontend` if repo root is above)
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`
5. Add Environment Variable:
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend-url/api` (your deployed backend API URL)
6. Click **Deploy**.

### Step 4: Deploy Backend (Railway / Render)

**Railway:**
1. Go to [railway.app](https://railway.app), sign in with GitHub.
2. New Project → Deploy from GitHub → select your repo.
3. Set root directory to `backend` (or `project_furni/backend`).
4. Add environment variable: `MONGODB_URI` (your MongoDB connection string).
5. Railway will auto-detect Node.js and deploy. Note the public URL (e.g. `https://xxx.railway.app`).

**Render:**
1. Go to [render.com](https://render.com), sign in.
2. New → Web Service → connect repo.
3. Root directory: `backend`
4. Build: `npm install`
5. Start: `npm start`
6. Add `MONGODB_URI` in Environment.

### Step 5: Connect Frontend to Backend

1. In Vercel project → **Settings** → **Environment Variables**.
2. Set `REACT_APP_API_URL` = `https://your-railway-or-render-url/api`
3. Redeploy the frontend.

---

## Option B: Frontend Only (Static Demo on Vercel)

If you only want to deploy the frontend without a backend (for demo):

1. Deploy the `frontend` folder to Vercel as above.
2. Leave `REACT_APP_API_URL` empty or unset (frontend will use `/api` and API calls will fail unless you add a serverless API later).
3. The UI will load but API features (orders, gallery, etc.) will not work without a backend.

---

## Quick Commands Summary

| Action | Command |
|--------|---------|
| Build frontend locally | `cd frontend && npm run build` |
| Run frontend | `cd frontend && npm start` |
| Run backend | `cd backend && npm start` |

---

## Troubleshooting

- **404 on routes:** Ensure Vercel rewrites are set. Add `vercel.json` in the frontend folder:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- **API calls fail:** Check `REACT_APP_API_URL` and CORS on your backend (allow your Vercel domain).
- **Logo not showing:** Logo is at `/logo.png` in `public/`; it will be served automatically.
