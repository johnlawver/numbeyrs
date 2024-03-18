# Use Node.js as base image
FROM node:latest as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to work directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all source code to work directory
COPY . .

# Build the app
RUN npm run build

# Use Nginx as base image for serving the app
FROM nginx:alpine

# Copy built app from build stage to Nginx web server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port (optional, you can expose it when running the container)
EXPOSE 80

# Command to start Nginx server
CMD ["nginx", "-g", "daemon off;"]
