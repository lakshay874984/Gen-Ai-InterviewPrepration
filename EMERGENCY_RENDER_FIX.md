# Emergency Render Deployment Fix

## 🚨 Current Issue
Backend won't start - dependencies not installing. Error shows `cd Backend && npm start` still being used.

## ✅ Step 1: Force Clear Caches (CRITICAL)

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click on `interview-backend` service**
3. **Click Settings tab**
4. **Scroll to "Build & Deploy" section**
5. **Click "Clear Build Cache"** button
6. **Go back to Overview tab**
7. **Click "Manual Deploy"** button at the top right
8. **Wait and watch the logs** - DO NOT close the page

## 📋 Step 2: Monitor the Deployment

You should see logs like this (in order):

```
=== Building Backend Service ===
Setting up language runtime...
Node version 20.11.0 detected
Installing dependencies...
npm install --verbose --legacy-peer-deps

> downloading packages
> installing @google/generative-ai@0.24.1
> installing bcrypt@6.0.0
> installing dotenv@17.3.1
> ... all dependencies

npm WARN optional skipping optional dependency
✅ Dependencies installed successfully

=== Starting Backend Service ===
npm start

> Server running on port 3000
> Environment: production
```

If you see errors, note them and share with me.

## 🔄 Step 3: If Still Failing

Try this alternative approach:

### Option A: Delete and Recreate Service
1. Go to Backend service → Settings
2. Scroll to bottom → **"Delete Service"**
3. Confirm deletion
4. Go back to dashboard
5. Click **"New +" → "Web Service"**
6. Select your GitHub repo
7. **Set these exact values:**
   - Name: `interview-backend`
   - Region: `Oregon` (or closest to you)
   - Branch: `main`
   - Root Directory: **`Backend`** ← Important!
   - Environment: **Node**
   - Node Version: **20.11.0**
   - Plan: **Standard**
   - Build Command: **`npm install`**
   - Start Command: **`npm start`**
8. Add all environment variables
9. Click **"Deploy"**

### Option B: Use Different Deployment Method

If render.yaml isn't working, try individual service creation:

**For Backend:**
1. Don't use Blueprint/render.yaml
2. Manually create Web Service
3. Ensure Root Directory is set to `Backend`

**For Frontend:**
1. Create Static Site separately
2. Set Root Directory to `Frontend`

## 🔍 Verify DNS/GitHub Integration

1. **Check GitHub connection:**
   - Render Dashboard → Settings → GitHub
   - Ensure repo is authorized
   - Check if Render can see recent commits

2. **Force GitHub sync:**
   - Go to service → Settings
   - Check branch is `main`
   - Click refresh button if available

## 📝 Render.yaml Syntax Check

Make sure your `render.yaml` at project root looks exactly like this:

```yaml
services:
  - type: web
    name: interview-backend
    env: node
    plan: standard
    root: Backend
    branch: main
    nodeVersion: 20.11.0
    buildCommand: npm install
    startCommand: npm start
    healthCheckPath: /health
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000
```

**Key things:**
- No `cd Backend` in commands
- `root: Backend` is set
- `env: node` not `engine: node`
- Proper indentation (2 spaces per level)

## 🧪 Test Locally First

Before redeploying, verify locally:

```bash
cd Backend

# Install dependencies
npm install

# Run server
npm start

# In another terminal, test
curl http://localhost:3000/health
# Should return: {"status":"ok","timestamp":"..."}
```

If this works locally but fails on Render, it's a Render configuration issue.

## 💡 Common Causes & Fixes

| Issue | Fix |
|-------|-----|
| Cache not cleared | Settings → Clear Build Cache → Manual Deploy |
| Old build still running | Stop service → Start service |
| Wrong root directory | Set Root Directory to exactly `Backend` |
| Env vars not set | Environment section in Settings |
| CORS failing | Check FRONTEND_URL environment variable |
| Still can't find dotenv | Delete service, recreate manually |

## 📞 Nuclear Option

If nothing works:

1. **Delete the service entirely**
   - Go to service → Settings → Delete Service
   
2. **Delete render.yaml from repo**
   ```bash
   rm render.yaml
   git add .
   git commit -m "Remove render.yaml"
   git push
   ```

3. **Manually create services on Render:**
   - Backend: Create Web Service, select repo, set root=Backend
   - Frontend: Create Static Site, select repo, set root=Frontend
   - This bypasses any YAML parsing issues

4. **Re-add render.yaml later** if needed

## ✨ Success Indicators

✅ Backend deploys without errors
✅ Logs show "Server running on port 3000"
✅ Health check returns 200: `curl backend-url/health`
✅ Frontend can reach Backend (no CORS errors)

---

**Next Step**: Go to Render dashboard RIGHT NOW and click "Clear Build Cache" on the Backend service, then "Manual Deploy". Watch the logs and tell me what you see!
