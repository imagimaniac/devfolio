#!/bin/bash
# Stop DevFolio Development Server

echo "Stopping DevFolio dev server..."

# Kill all next-server processes related to devfolio
pkill -f "next-server" && echo "✓ Dev server stopped" || echo "No dev server running"

echo ""
echo "Your live site is still accessible at: https://devfolio-mauve-six.vercel.app/"
