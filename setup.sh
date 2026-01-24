#!/bin/bash

# Doctor Claude MCP Server Setup Script
set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Setting up Doctor Claude MCP server..."
echo "Repository directory: $SCRIPT_DIR"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Add to Claude Code
echo "Adding to Claude Code..."
claude mcp add --transport stdio doctor-claude -- node "$SCRIPT_DIR/build/index.js"

echo ""
echo "✓ Setup complete!"
echo ""
echo "Next steps:"
echo "1. (Optional) Create a patient-profile.json file (see README for details)"
echo "2. Launch Claude Code and type: /doctor-claude:diagnostic_consultation"
