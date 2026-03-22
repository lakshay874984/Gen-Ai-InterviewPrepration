#!/bin/bash
# Render build script for Backend
# This ensures all dependencies are properly installed

set -e  # Exit on any error

echo "🔨 Building Backend for Render..."
echo "📦 Installing dependencies..."

cd Backend

# Install dependencies verbosely to see what's happening
npm install --verbose

echo "✅ Dependencies installed successfully"
echo "📝 Installed packages:"
npm list --depth=0

echo "✨ Backend build complete!"
