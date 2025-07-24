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


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
