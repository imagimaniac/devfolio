#!/bin/bash
# Check DevFolio Server Status

echo "DevFolio Server Status"
echo "======================"
echo ""

# Check if dev server is running
if pgrep -f "next-server" > /dev/null; then
    echo "Status: 🟢 RUNNING"
    echo ""
    echo "Processes:"
    ps aux | grep next-server | grep -v grep | awk '{print "  PID:", $2, "| CPU:", $3"%", "| MEM:", $4"%", "| Started:", $9, $10}'
    echo ""
    echo "⚠️  This is draining your battery when idle!"
    echo ""
    echo "To stop: ./stop-dev.sh"
else
    echo "Status: 🔴 STOPPED"
    echo ""
    echo "Your live site is still accessible at:"
    echo "  https://devfolio-mauve-six.vercel.app/"
    echo ""
    echo "To start: ./start-dev.sh"
fi
