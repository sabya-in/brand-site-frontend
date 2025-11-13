# --- STAGE 1: Build the React App ---
# Use a lightweight Node.js image (Alpine is a minimal Linux distribution)
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
# This caches dependencies unless the file changes, speeding up future builds
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the app for production (Vite outputs to /dist)
RUN npm run build

# --- STAGE 2: Serve the Built App with Nginx ---
# Use a very lightweight Nginx image
FROM nginx:1.25-alpine

# Copy the built static files from the 'builder' stage
# The 'npm run build' command creates a 'dist' folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx exposes port 80 by default, so we just confirm
EXPOSE 80

# The default Nginx command just works, but we add this for clarity
# This starts Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]