# Base image with Node.js
FROM node:20

# Set working directory
WORKDIR /app

# Copy your bonus claimer frontend
COPY public ./public

# Copy bot source
COPY bot ./bot

# Install bot dependencies
WORKDIR /app/bot
RUN npm install

# Go back to root and install static server
WORKDIR /app
RUN npm install -g serve

# Expose port
EXPOSE 8080

# Start both the static site and bot using a shell script
COPY start.sh ./start.sh
RUN chmod +x start.sh

CMD ["./start.sh"]
