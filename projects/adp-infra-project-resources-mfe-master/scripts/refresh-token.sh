#!/bin/bash
# Token refresh script using clipboard

TOKEN_URL="https://access-dev.adp.autodesk.com/utility/access-token?continue"
ENV_FILE=".env"

echo "🔄 Token Refresh Script"
echo "======================"

# Open browser to token URL
echo "📱 Opening browser to get new token..."
if command -v open >/dev/null 2>&1; then
    open "$TOKEN_URL"
else
    echo "Please manually open: $TOKEN_URL"
fi

echo ""
echo "📋 Instructions:"
echo "1. Copy the token from the browser (Cmd+C)"
echo "2. Come back to this terminal"
echo "3. Press Enter to read token from clipboard"
echo ""
read -p "Press Enter when you have copied the token to clipboard..."

# Try to read from clipboard
if command -v pbpaste >/dev/null 2>&1; then
    # macOS
    new_token=$(pbpaste | tr -d '\n\r\t ' | sed 's/[[:space:]]//g')
    echo "✅ Token read from clipboard (length: ${#new_token} characters)"
elif command -v xclip >/dev/null 2>&1; then
    # Linux with xclip
    new_token=$(xclip -selection clipboard -o | tr -d '\n\r\t ' | sed 's/[[:space:]]//g')
    echo "✅ Token read from clipboard (length: ${#new_token} characters)"
else
    # Clipboard not available
    echo "❌ Clipboard access not available."
    echo ""
    echo "Please manually update your .env file:"
    echo "1. Copy your token from the browser"
    echo "2. Edit .env file and add/update: LOCAL_TOKEN=your_token_here"
    echo "3. Run 'yarn start' to start the dev server"
    echo ""
    exit 1
fi

# Validate input
if [ -z "$new_token" ]; then
    echo "❌ No token found. Please try again."
    exit 1
fi

# Basic JWT validation
if [[ ! "$new_token" =~ ^eyJ ]]; then
    echo "⚠️  Warning: Token doesn't look like a JWT (should start with 'eyJ')"
    echo "Continue anyway? (y/N)"
    read -r confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        echo "❌ Cancelled."
        exit 1
    fi
fi

echo ""
echo "📝 Updating .env file..."

# Update .env file
if [ ! -f "$ENV_FILE" ]; then
    echo "LOCAL_TOKEN=$new_token" > "$ENV_FILE"
    echo "✅ Created new .env file"
else
    if grep -q "^LOCAL_TOKEN=" "$ENV_FILE"; then
        grep -v "^LOCAL_TOKEN=" "$ENV_FILE" > "$ENV_FILE.tmp"
        echo "LOCAL_TOKEN=$new_token" >> "$ENV_FILE.tmp"
        mv "$ENV_FILE.tmp" "$ENV_FILE"
        echo "✅ Updated LOCAL_TOKEN in .env file"
    else
        echo "LOCAL_TOKEN=$new_token" >> "$ENV_FILE"
        echo "✅ Added LOCAL_TOKEN to .env file"
    fi
fi

echo ""
echo "🔍 Verification:"
if grep -q "^LOCAL_TOKEN=" "$ENV_FILE"; then
    echo "✅ LOCAL_TOKEN successfully updated in .env file"
    # Show preview
    local_token_line=$(grep "^LOCAL_TOKEN=" "$ENV_FILE")
    token_preview="${local_token_line:0:25}...${local_token_line: -15}"
    echo "   Preview: $token_preview"
else
    echo "❌ ERROR: Failed to update .env file"
    exit 1
fi

echo ""
echo "🚀 Starting development server..."
yarn start

