# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Copy frontend package definitions
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend code and build
COPY frontend/ ./
RUN npm run build


# Stage 2: Production Runtime
FROM node:20-alpine

# Set environment variables for Cloud Run
ENV NODE_ENV=production
ENV PORT=8080

# Working directory for the backend server
WORKDIR /app/backend

# Copy backend package definitions and install ONLY production dependencies
COPY backend/package*.json ./
RUN npm install --omit=dev

# Copy backend application source code
COPY backend/ ./

# Copy built frontend assets from the builder stage
# Placed in /app/frontend/dist as expected by server.js (path.join(__dirname, '../frontend/dist'))
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Expose the Cloud Run port
EXPOSE 8080

# Execute server using node
CMD ["node", "server.js"]
