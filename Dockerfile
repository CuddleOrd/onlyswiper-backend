# Use the official Node.js image as a base
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the TypeScript source code
COPY . .

# Install TypeScript and compile the code
RUN npm install -g typescript
RUN tsc

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "dist/index.js"]
