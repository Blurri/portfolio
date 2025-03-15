#!/usr/bin/env bash

# Script to fetch secrets from GitHub and store them locally
# Usage: ./fetch-secrets.sh [owner/repo]

set -e

# Default repository if not provided
DEFAULT_REPO="your-username/your-repo"
REPO="${1:-$DEFAULT_REPO}"
SECRETS_FILE=".secrets"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
  echo "Error: GitHub CLI is not installed. Please install it first:"
  echo "  brew install gh"
  exit 1
fi

# Check if GitHub token is set
if [ -z "$GITHUB_TOKEN" ]; then
  echo "Error: GITHUB_TOKEN environment variable is not set."
  echo "Please set it in your shell or add it to your .envrc file:"
  echo "  export GITHUB_TOKEN=your_token"
  exit 1
fi

# Check if logged in to GitHub CLI
if ! gh auth status &> /dev/null; then
  echo "You need to login to GitHub CLI first:"
  gh auth login
fi

# Function to fetch a specific secret
fetch_secret() {
  local secret_name="$1"
  echo "Fetching secret: $secret_name"
  
  # Try to get the secret using GitHub CLI
  local secret_value
  secret_value=$(gh secret get "$secret_name" -R "$REPO" 2>/dev/null || echo "")
  
  if [ -n "$secret_value" ]; then
    echo "export $secret_name=\"$secret_value\"" >> "$SECRETS_FILE"
    echo "✅ Secret $secret_name fetched successfully"
  else
    echo "⚠️  Could not fetch secret $secret_name"
  fi
}

# Create or clear the secrets file
echo "# GitHub Secrets - Generated on $(date)" > "$SECRETS_FILE"
echo "# Do not commit this file to version control" >> "$SECRETS_FILE"
echo "" >> "$SECRETS_FILE"

# List of secrets to fetch - add your secret names here
SECRETS=(
  "API_KEY"
  "DATABASE_URL"
  "JWT_SECRET"
  # Add more secrets as needed
)

echo "Fetching secrets from GitHub repository: $REPO"
for secret in "${SECRETS[@]}"; do
  fetch_secret "$secret"
done

echo ""
echo "Secrets have been saved to $SECRETS_FILE"
echo "To load these secrets in your environment, add this to your .envrc:"
echo "  source $SECRETS_FILE"

# Make the secrets file readable only by the owner
chmod 600 "$SECRETS_FILE" 