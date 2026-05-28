FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend source code, including the utils and dataset directories
COPY . .

# Start the application
CMD ["node", "index.js"]