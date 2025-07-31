#!/bin/bash

# Get Node.js major version
NODE_MAJOR_VERSION=$(node -v | cut -d'.' -f1 | sed 's/v//')

# If Node.js version is 17 or higher, use the legacy provider flag
if [ "$NODE_MAJOR_VERSION" -ge 17 ]; then
    echo "Node.js v$NODE_MAJOR_VERSION detected - using OpenSSL legacy provider"
    node --openssl-legacy-provider ./node_modules/.bin/next build
else
    echo "Node.js v$NODE_MAJOR_VERSION detected - no OpenSSL legacy provider needed"
    ./node_modules/.bin/next build
fi
