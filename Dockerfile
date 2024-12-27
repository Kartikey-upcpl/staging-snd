# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies ignoring peer dependency conflicts
RUN npm install --legacy-peer-deps

# Copy the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["npm", "run", "dev"]
