# #!/usr/bin/env bash

# # Install root dependencies
# echo "Installing root dependencies..."
# npm install

# # Install front-end dependencies
# echo "Installing front-end dependencies..."
# npm install --prefix front-end

# # Build front-end
# echo "Building front-end..."
# npm run build --prefix front-end

#!/usr/bin/env bash

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

