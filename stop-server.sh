#!/bin/sh

# Start the server in the background
npm start &

# Wait for the stop command
while true; do
    if [ -f "/stop-server" ]; then
        echo "Stopping server gracefully..."
        # Add any necessary cleanup or graceful shutdown commands here
        # For example, you can use the 'kill' command to send a SIGTERM signal to the server process
        kill $(pgrep -f "npm start")
        break
    fi
    sleep 1
done

# Remove the stop command file
rm -f /stop-server
