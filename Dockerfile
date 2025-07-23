FROM node:18-alpine

WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

EXPOSE 8080

CMD ["npm", "start"]
