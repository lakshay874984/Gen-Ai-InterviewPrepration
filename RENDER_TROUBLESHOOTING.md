# Render Deployment Troubleshooting Guide

## Backend Won't Start - Port Not Detected

### Root Causes
1. **Node.js Version Mismatch** - pdf-parse/puppeteer incompatibility
2. **Port Not Bound** - Server listening on wrong host/port
3. **Heavy Dependencies** - pdf-parse and puppeteer require significant RAM

### Solutions Applied ✅

#### 1. **Fixed Server.js**
- Now binds to `0.0.0.0` instead of localhost
- Graceful shutdown handling
- Better error logging

#### 2. **Updated render.yaml**
- Node.js version locked to `20.11.0` (LTS)
- Using `npm ci` for clean installs
- Proper environment variables set

#### 3. **Node Version**
- Created `.nvmrc` with Node 20.11.0
- Ensures local and Render environments match

### If Still Getting Errors

#### Option A: Lightweight Alternative (Recommended)
Replace pdf-parse and puppeteer with lighter alternatives:

```bash
# Replace puppeteer
npm uninstall puppeteer
npm install cheerio

# Or use playwright (lighter than puppeteer)
npm install playwright
```

#### Option B: Skip Download (Render Workaround)
```bash
# In Backend package.json scripts, add preinstall:
"preinstall": "npx npm-force-resolutions && export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true"
```

#### Option C: Upgrade Render Plan
Free plan = 512MB RAM (too small for puppeteer)
Standard plan = 2GB RAM (recommended)

### Verification Steps

1. **Check Node version:**
   ```bash
   node --version  # Should be v20.11.0+
   ```

2. **Test locally:**
   ```bash
   npm run install:all
   npm run dev
   ```

3. **Check Backend logs on Render:**
   - Go to Render Dashboard
   - Click Backend service
   - Check "Logs" tab for errors
   - Look for port binding message

4. **If port still not detected:**
   ```bash
   # Force PORT binding
   DEBUG=* npm start
   ```

### Important Environment Variables

Set in Render Dashboard → Backend Service → Environment:

```
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
MONGO_URI=your-connection-string
JWT_SECRET=secure-key
GOOGLE_API_KEY=your-key
FRONTEND_URL=https://your-frontend.onrender.com
NODE_OPTIONS=--enable-source-maps
```

### Heavy Dependencies Impact

| Dependency | RAM Usage | Status |
|------------|-----------|--------|
| puppeteer | 400-500MB | ⚠️ Free tier risky |
| pdf-parse | 50-100MB | ⚠️ Can cause build fails |
| express | 10MB | ✅ OK |
| mongoose | 20MB | ✅ OK |

### Recommended Architecture for Render Free Tier

```
Free Tier Limits: 512MB RAM
├── Node runtime: ~200MB
├── Dependencies: ~150MB  
├── App running: ~100MB
├── Available: ~62MB ← Too tight for puppeteer!

Solution: Use Standard tier ($7/month) → 2GB RAM
```

### Contact Support Resources

- **Render Docs**: https://render.com/docs
- **Node Version Issues**: Check render.yaml nodeVersion field
- **Port Issues**: Ensure `PORT` env var is set
- **Out of Memory**: Check Render metrics dashboard

### Quick Fixes Checklist

- [ ] Node.js version set to 20.11.0 in render.yaml
- [ ] `PORT` and `HOST` environment variables set
- [ ] `npm ci` used instead of `npm install`
- [ ] Backend startup command is `npm start` (not `node server.js`)
- [ ] MONGO_URI environment variable configured
- [ ] Frontend URL in environment for CORS
- [ ] `.nvmrc` file present (v20.11.0)

### Next Steps

1. **Push changes:**
   ```bash
   git add .
   git commit -m "Fix Render backend startup issues"
   git push
   ```

2. **Trigger redeploy on Render:**
   - Go to Render Dashboard
   - Click Backend service
   - Click "Manual Deploy" 
   - Watch logs in real-time

3. **Monitor:**
   - Check if "No open ports detected" error is gone
   - Verify backend is responding
   - Test frontend connection

---

**Still stuck?** Check Render logs for specific error messages and update this guide accordingly.
