#!/bin/bash

# Navigate to the front-end directory and install dependencies
cd front-end
npm install

# Build the front-end
npm run build

# Navigate back to the root directory
cd ..

# Navigate to the back-end directory and install dependencies
cd back-end
npm install

# Move the built front-end files to the back-end public directory
mkdir -p ./public
cp -r ../front-end/build/* ./public/
