#!/bin/bash
# Quick reference - copy/paste these commands in order

echo "=== Step 1: Commit all changes ==="
git add .
git commit -m "Emergency fixes: clear caches and reconfigure"
git push
echo "✅ Changes pushed to GitHub"

echo ""
echo "=== Step 2: Clear Render Cache ==="
echo "1. Go to: https://dashboard.render.com"
echo "2. Click 'interview-backend' service"
echo "3. Go to Settings tab"
echo "4. Click 'Clear Build Cache'"
echo "5. Go back to Overview"
echo "6. Click 'Manual Deploy'"
echo "7. Watch the logs for errors"

echo ""
echo "=== Step 3: Verify Deployment ==="
echo "When deployment completes:"
echo "curl https://interview-backend.onrender.com/health"
echo "Should return: {\"status\":\"ok\",\"timestamp\":\"...\"}"
