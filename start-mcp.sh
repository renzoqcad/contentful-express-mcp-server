#!/bin/bash
source ~/.nvm/nvm.sh

# Use Node 22
nvm use 22 >/dev/null 2>&1

# Read the URL from the first argument
URL="$1"

# Exit if no URL is passed
if [ -z "$URL" ]; then
  echo "❌ No URL provided. Usage: ./start-mcp.sh <url>"
  exit 1
fi

# Run mcp-remote
npx mcp-remote "$URL"