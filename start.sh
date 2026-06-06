#!/bin/bash

# Start API
dotnet BlobPulse.API.dll &

# Start Next.js
cd /var/www/blobpulse
npm install --omit=dev
npm start &

wait