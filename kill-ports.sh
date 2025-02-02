#!/bin/bash

# Function to kill processes running on a specific port
kill_port() {
    local port=$1
    echo "Attempting to kill processes on port $port..."

    # Find the PID of the process using the port
    local pid=$(lsof -ti :$port)

    if [ -z "$pid" ]; then
        echo "No processes found running on port $port."
    else
        echo "Killing process with PID $pid running on port $port..."
        kill -9 $pid
        if [ $? -eq 0 ]; then
            echo "Successfully killed process on port $port."
        else
            echo "Failed to kill process on port $port."
        fi
    fi
}

# Kill processes on ports 3000, 3001, and 3002
kill_port 3000
kill_port 3001
kill_port 3002

echo "Port cleanup complete."