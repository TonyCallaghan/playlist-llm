# Use the official Node.js 18 image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Copy app source code
COPY . .

# Build the Next.js app
RUN npm run build

# Install `serve` to serve the static files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Start the static file server
CMD ["serve", "-s", "out", "-l", "3000"]
