# 🚀 Render Deployment Checklist

## ✅ Pre-Deployment

- [ ] All changes committed to GitHub
- [ ] `.env` files NOT committed (proper .gitignore)
- [ ] Backend `package.json` has all dependencies (including `dotenv`)
- [ ] Frontend `package.json` configured
- [ ] MongoDB connection string ready
- [ ] JWT secret key generated

## 📋 Render Dashboard Setup

### Backend Service
- [ ] Service name: `interview-backend`
- [ ] Root Directory: `Backend`
- [ ] Environment: Node
- [ ] Plan: Standard ($7/month - required for puppeteer)
- [ ] Node Version: 20.11.0
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`

### Frontend Service
- [ ] Service name: `interview-frontend`
- [ ] Root Directory: `Frontend`
- [ ] Environment: Static Site
- [ ] Plan: Free
- [ ] Build Command: `npm install && npm run build`
- [ ] Publish Directory: `dist`

### Environment Variables

**Backend Service:**
```
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secure-key
GOOGLE_API_KEY=your-api-key
FRONTEND_URL=https://interview-frontend.onrender.com
```

**Frontend Service:**
```
VITE_BACKEND_URL=https://interview-backend.onrender.com
```

## 🔑 Important Notes

### Puppeteer & pdf-parse Warning ⚠️
Your project uses:
- `puppeteer` (browser automation)
- `pdf-parse` (PDF parsing)

These require significant RAM:
- **Free tier**: 512MB (WILL FAIL)
- **Standard tier**: 2GB (RECOMMENDED - $7/month)

**Action**: Upgrade Backend to Standard tier or replace with lighter alternatives.

## 🚀 Deployment Steps

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Fix Render deployment - use root property"
git push
```

### 2. Create Backend Service on Render
1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Fill in:
   - **Name**: interview-backend
   - **Root Directory**: `Backend`
   - **Region**: Choose closest to your users
   - **Environment**: Node
   - **Plan**: Standard ($7/month)
   - **Branch**: main
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add all Backend environment variables
6. Click **Deploy**

### 3. Create Frontend Service on Render
1. Click **New +** → **Static Site**
2. Connect same GitHub repository
3. Fill in:
   - **Name**: interview-frontend
   - **Root Directory**: `Frontend`
   - **Region**: Same as backend
   - **Plan**: Free
   - **Branch**: main
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
4. Add Frontend environment variable: `VITE_BACKEND_URL`
5. Click **Deploy**

## ✅ Verification

### Backend Health Check
```bash
curl https://interview-backend.onrender.com/health
# Should return: {"status":"ok","timestamp":"..."}
```

### Check Logs
1. Go to Backend service → **Logs**
2. Look for: `✅ Server running on port 3000`
3. Go to Frontend service → **Logs**
4. Look for: `✨ Deployed!` or similar success message

### Test Full Integration
1. Open Frontend URL
2. Try to log in or create account
3. Check Browser Console for API errors
4. If CORS errors: verify `FRONTEND_URL` in Backend

## ⚠️ Troubleshooting

| Error | Solution |
|-------|----------|
| Module not found (dotenv) | Clear build cache, redeploy |
| Port not detected | Check health check endpoint, verify PORT env var |
| CORS errors | Update `FRONTEND_URL` environment variable |
| Blank frontend page | Check browser console, verify `VITE_BACKEND_URL` |
| Out of memory | Upgrade Backend to Standard tier |
| Build timeout | Reduce dependencies or upgrade plan |

## 📞 Support

- **Render Docs**: https://render.com/docs
- **Render Status**: https://status.render.com
- **GitHub Issues**: Check your repo for error details

## 🎉 Success Indicators

✅ Backend is running (health check returns 200)
✅ Frontend is deployed and accessible
✅ Frontend can connect to Backend (no CORS errors)
✅ Can log in / perform main functionality
✅ MongoDB is connected
✅ API calls are working

---

**Last Updated**: March 22, 2026
**Configuration Version**: 1.0.0
