# Step 1: Build the frontend
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all necessary files for building
COPY . .

# Build the app
RUN npm run build -- --verbose

# Step 2: Serve the app using Nginx
FROM nginx:stable-alpine

# Remove any existing frontend files in the Nginx html directory
RUN rm -rf /usr/share/nginx/html/*

# Copy the built app to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom nginx configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port the app runs on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
