#!/bin/bash
# Render build script for Frontend
# This ensures all dependencies are properly installed and built

set -e

echo "🔨 Building Frontend for Render..."
echo "📦 Installing dependencies..."

cd Frontend

npm install --verbose

echo "🏗️  Building optimized production bundle..."
npm run build

echo "✅ Frontend build complete!"
ls -lh dist/ || echo "Build artifacts not found"
