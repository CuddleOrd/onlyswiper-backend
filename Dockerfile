# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json/yarn.lock files
COPY package*.json ./
# If you're using Yarn, uncomment the following line
# COPY yarn.lock ./

# Install dependencies
RUN npm install
# If using Yarn, use this line instead:
# RUN yarn install

# Copy the rest of the application code
COPY . .

# If you are building any static assets (optional)
# RUN npm run build

# Stage 2: Run the app in production
FROM node:18-alpine

# Set NODE_ENV to production for optimization
ENV NODE_ENV=production

# Set the working directory
WORKDIR /usr/src/app

# Copy the necessary files from the builder stage
COPY --from=builder /usr/src/app .

# Install only production dependencies
RUN npm install --only=production
# If using Yarn, use this line instead:
# RUN yarn install --production

# Expose the port the app will run on (replace 3000 if your app runs on a different port)
EXPOSE 3000

# Start the Express.js app
CMD ["npm", "start"]
