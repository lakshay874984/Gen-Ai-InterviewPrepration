# Root-Level Deployment Guide for Render

Your project is now configured for **root directory deployment** on Render. Both Frontend and Backend will be deployed from the root folder.

## 📋 Project Structure

```
YT-GENAI-3/                    ← Root directory (deploy from here)
├── package.json                ← Root package.json with scripts
├── render.yaml                 ← Render deployment config
├── .renderignore               ← Files to exclude
├── .env.render                 ← Environment variables template
├── scripts/
│   ├── dev.js                 ← Development startup script
│   └── start.js               ← Production startup script
├── Backend/
│   ├── package.json
│   ├── server.js
│   └── src/
├── Frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
```

## 🚀 Deployment Steps

### 1. **Push to GitHub**
```bash
git add .
git commit -m "Setup root-level Render deployment"
git push
```

### 2. **Connect to Render**
- Go to [dashboard.render.com](https://dashboard.render.com)
- Click **"New +" → "Blueprint"**
- Select your GitHub repository
- **IMPORTANT**: Leave Root Directory **EMPTY** (Render will use root by default)

### 3. **Render Auto-Detects Configuration**
Render reads `render.yaml` from the root and deploys:
- **Backend**: Web Service (Node.js)
- **Frontend**: Static Site (React)

### 4. **Add Environment Variables in Render Dashboard**

Go to your Render Dashboard → Your Backend Service → Environment:

```
NODE_ENV                = production
MONGO_URI               = mongodb+srv://...
JWT_SECRET              = your-secret-key
GOOGLE_API_KEY          = your-google-key
FRONTEND_URL            = https://your-frontend.onrender.com
```

For Frontend Service → Environment:
```
VITE_BACKEND_URL        = https://your-backend.onrender.com
```

## 📦 Local Development

```bash
# First time setup
npm run install:all

# Development (runs both services)
npm run dev

# Or individually
npm run dev:backend
npm run dev:frontend

# Build for production
npm run build
```

## 📝 What Each Script Does

| Script | Purpose |
|--------|---------|
| `npm run install:all` | Installs dependencies for root, Backend, and Frontend |
| `npm run dev` | Runs both services in development mode |
| `npm run build` | Builds Backend + Frontend for production |
| `npm run build:backend` | Installs Backend dependencies (Render uses this) |
| `npm run build:frontend` | Builds Frontend dist folder (Render uses this) |
| `npm start` | Starts the production backend (Render uses this) |

## 🔑 Environment Variables Mapping

### Backend (.env)
```
NODE_ENV=production
PORT=3000
MONGO_URI=<from Render Env>
JWT_SECRET=<from Render Env>
GOOGLE_API_KEY=<from Render Env>
FRONTEND_URL=<Set in Render Env>
```

### Frontend (.env)
```
VITE_BACKEND_URL=<Set in Render Env>
```

## ⚙️ How Render Executes Your App

### Build Phase
```
1. Clone repository (root directory)
2. npm run build:backend    ← Installs Backend deps
3. npm run build:frontend   ← Installs Frontend deps & builds dist/
```

### Start Phase
```
1. npm start                ← Runs scripts/start.js
2. Backend serves on PORT 3000
3. Frontend served from Frontend/dist/ as static files
```

## 🎯 Key Advantages of Root Deployment

✅ Single repository to manage  
✅ Automatic environment variable syncing between services  
✅ Simplified deployment configuration  
✅ Both services use same build process  
✅ Easy to scale each service independently  

## 🔍 Deployment Status & Logs

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click your Backend service → **Logs**
3. Click your Frontend service → **Logs**
4. Watch real-time deployment progress

## ⚠️ Important Notes

- **Puppeteer**: Uses 500MB+ RAM. Render free tier has 512MB. **Upgrade to Standard tier** ($7/month) or replace with lightweight alternative
- **Build Time**: Frontend build takes 2-3 minutes
- **Cold Starts**: Free tier services sleep after 15 mins inactivity
- **MongoDB**: Whitelist Render IPs in MongoDB Atlas (IP: 0.0.0.0/0 for any, or specific Render ranges)

## 🐛 Troubleshooting

### CORS Errors
- Check `FRONTEND_URL` in Backend environment variables
- Check `VITE_BACKEND_URL` in Frontend environment variables

### Build Fails
- Check Render logs for specific errors
- Ensure all dependencies are in Backend/package.json and Frontend/package.json
- Run `npm run install:all` locally to verify

### Frontend Blank Page
- Open Browser DevTools → Console
- Check for API errors
- Verify backend is running and responding

### Database Connection Failed
- Test MongoDB URI locally
- Whitelist Render IPs in MongoDB Atlas
- Check `MONGO_URI` environment variable

## 📚 Resources

- [Render Documentation](https://render.com/docs)
- [Blueprint Reference](https://render.com/docs/deploy-with-blueprint)
- [Environment Variables](https://render.com/docs/environment-variables)
