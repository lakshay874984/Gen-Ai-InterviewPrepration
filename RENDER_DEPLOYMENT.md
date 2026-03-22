# Render Deployment Guide

## Project Structure
This is a monorepo with Frontend (React + Vite) and Backend (Express.js) services.

## Deployment Options

### Option 1: Deploy as Monorepo (Recommended)
Deploy both frontend and backend together using the root `render.yaml`:

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will detect and deploy both services automatically

### Option 2: Deploy Separately
Deploy frontend and backend as individual services:

#### Backend Deployment:
1. Create new Web Service on Render
2. Connect your GitHub repo
3. Set root directory to `Backend`
4. Runtime: Node
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variables (see .env.example)

#### Frontend Deployment:
1. Create new Static Site on Render
2. Connect your GitHub repo
3. Set root directory to `Frontend`
4. Build Command: `npm run build`
5. Publish Directory: `dist`
6. Add environment variables (see .env.example)

## Environment Variables

Set these in Render Dashboard → Environment:

### Backend Service
- `NODE_ENV`: production
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key
- `GOOGLE_API_KEY`: Your Google API key (if using)
- `FRONTEND_URL`: Your frontend URL (Render will auto-set this)

### Frontend Service
- `VITE_BACKEND_URL`: Your backend URL (Render will auto-set this)

## Important Notes

1. **Cold Starts**: Free tier services sleep after 15 minutes of inactivity. Upgrade to Paid for production use.
2. **Database**: Ensure your MongoDB allows connections from Render's IP range
3. **Build Time**: Frontend build might take 2-3 minutes on free tier
4. **Health Checks**: Backend responds at /api/health if configured
5. **Static Site**: Frontend is served as static files from dist/

## First Deployment

1. Push your code to GitHub
2. Go to render.com and sign in
3. Click "New +" → "Blueprint"
4. Select your repository
5. Render will auto-detect the render.yaml and deploy both services
6. Monitor the deployment in the logs
7. Once deployed, test the connection between frontend and backend

## Troubleshooting

- **CORS Errors**: Check FRONTEND_URL and VITE_BACKEND_URL match deployed URLs
- **Build Fails**: Check build logs, ensure all dependencies are in package.json
- **Database Connection**: Ensure MongoDB IP whitelist includes Render's servers
- **Blank Frontend**: Check browser console for API errors, verify VITE_BACKEND_URL

## Documentation
- [Render Docs](https://render.com/docs)
- [Blueprint Guide](https://render.com/docs/deploy-with-blueprint)
