#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Define configuration variables
CONTAINER_NAME="blobpulse-prod-app"
IMAGE_NAME="blobpulse:prod"
API_PORT=8000
UI_PORT=3000

echo "============ 🚀 Starting Blobpulse Deployment ============"

# 1. Stop and remove existing container if it exists safely
if docker ps -a --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}$"; then
    echo "🛑 Stopping and removing existing container: ${CONTAINER_NAME}..."
    docker rm -f ${CONTAINER_NAME}
else
    echo "✨ No existing container named ${CONTAINER_NAME} found. Proceeding cleanly..."
fi

# 2. Build the production Docker image using host network (fixes font download issues)
echo "📦 Building Docker image [${IMAGE_NAME}]..."
docker build --network=host -f Dockerfile.prod -t ${IMAGE_NAME} .

# 3. Launch the container cleanly
echo "🏃 Launching container [${CONTAINER_NAME}]..."
docker run -d \
  -p ${UI_PORT}:3000 \
  -p ${API_PORT}:${API_PORT} \
  -e API_PORT=${API_PORT} \
  -e ASPNETCORE_URLS="http://0.0.0.0:${API_PORT}" \
  --name ${CONTAINER_NAME} \
  ${IMAGE_NAME}

echo "============ 🎉 Deployment Successful! ============"
echo "💻 UI available at:  http://localhost:${UI_PORT}"
echo "⚙️  API available at: http://localhost:${API_PORT}/api/blob/swagger/index.html"
echo "========================================================"

# Stream the logs briefly to make sure everything booted correctly
echo "📋 Showing live container logs (Press Ctrl+C to exit logs view):"
docker logs -f ${CONTAINER_NAME}