# Stage 1: Build the static site with Node
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve with a minimal HTTP server
FROM nginx:alpine

# Copy build output from Vite (default: /app/dist)
COPY --from=builder /app/dist /usr/share/nginx/html

# Optionally override default nginx config for client-side routing (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
