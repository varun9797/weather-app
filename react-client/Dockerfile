# Stage 1: Build React app
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:stable-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy React build output to nginx folder
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]