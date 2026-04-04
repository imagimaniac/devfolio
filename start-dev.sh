#!/bin/bash
# Start DevFolio Development Server

cd "$(dirname "$0")"

echo "Starting DevFolio dev server..."
echo "Website will be available at: http://localhost:3000"
echo "Your live site: https://devfolio-mauve-six.vercel.app/"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

yarn dev
