#!/usr/bin/env bash

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Install front-end dependencies
echo "Installing front-end dependencies..."
npm install --prefix front-end

# Build front-end
echo "Building front-end..."
npm run build --prefix front-end
