# Render Deployment - Dependencies Fix

## ✅ Issue Resolved

**Error**: `Cannot find module 'dotenv'`

**Root Cause**: Dependencies weren't being installed during build.

**Solution**: Updated `render.yaml` to use `root` property instead of `cd` commands.

## 📝 What Changed

### Before (Broken)
```yaml
buildCommand: cd Backend && npm install
startCommand: cd Backend && npm start
```

### After (Fixed)
```yaml
root: Backend
buildCommand: npm install
startCommand: npm start
```

## 🎯 How This Works

When you specify `root: Backend` in render.yaml:
1. Render treats the `Backend` folder as the project root
2. All commands run from within that directory
3. `npm install` automatically installs from `Backend/package.json`
4. `npm start` runs from the Backend directory
5. No need for `cd` command chaining

## 🚀 Deploy the Fix

1. **Push changes:**
```bash
git add .
git commit -m "Fix dependency installation - use root property in render.yaml"
git push
```

2. **Redeploy on Render:**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Go to your Backend service
   - Click **"Manual Deploy"** or wait for auto-deploy
   - Watch the logs - should see:
   ```
   Building Backend...
   npm install
   > downloading dependencies...
   ✅ Server running on port 3000
   ```

## 🔍 Verification

After deployment completes, test the endpoint:
```bash
curl https://your-backend.onrender.com/health
```

Expected response:
```json
{"status":"ok","timestamp":"2026-03-22T...Z"}
```

## 📋 Full Service Configuration

### Backend Service
- **Root Directory**: `Backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Health Check**: `/health`
- **Port**: 3000
- **Node Version**: 20.11.0

### Frontend Service
- **Root Directory**: `Frontend`
- **Build Command**: `npm install && npm run build`
- **Output Directory**: `dist`
- **Port**: Auto (Static Site)

## ⚙️ Environment Variables to Set

In Render Dashboard → Settings → Environment Variables:

### Backend Service
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
GOOGLE_API_KEY=your-key
FRONTEND_URL=https://your-frontend.onrender.com
NODE_ENV=production
```

### Frontend Service
```
VITE_BACKEND_URL=https://your-backend.onrender.com
```

## 🐛 If Still Getting Errors

### 1. Check npm cache
- Go to Backend service → Settings
- Click **"Clear Build Cache"**
- Manually redeploy

### 2. Verify package.json
- Ensure `Backend/package.json` exists and has all dependencies
- Check `dotenv` is in dependencies (not devDependencies)

### 3. Check logs for details
- Render Dashboard → Backend Service → Logs
- Look for errors during `npm install` phase
- Check for missing peer dependencies

### 4. Test locally first
```bash
cd Backend
npm install
npm start
```

Should see:
```
✅ Server running on port 3000
📋 Environment: production
```

## 🔗 Monorepo Blueprint Alternative

If you want to deploy from root directory with separate services, use `.renderignore` in Backend and Frontend to exclude unnecessary files.

Files added for this:
- `Backend/.renderignore` - Exclude Frontend files from Backend build
- `Frontend/.renderignore` - Exclude Backend files from Frontend build  
- `Backend/.npmrc` - npm configuration for cleaner builds
- `Frontend/.npmrc` - npm configuration for cleaner builds

## 📚 References

- [Render Web Services Docs](https://render.com/docs/web-services)
- [Node.js on Render](https://render.com/docs/node-environment)
- [Troubleshooting Renders](https://render.com/docs/troubleshooting-deploys)

---

✨ Your deployment should now work! The key fix was using the `root` property instead of trying to navigate with `cd` in the build command.
