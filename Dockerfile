# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install --ignore-engines --ignore-scripts

# Copy the rest of the code
COPY . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["yarn", "dev"]
