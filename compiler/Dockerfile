# Use a lightweight Node.js image with Node.js version 24 on Alpine Linux
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /app

# Install necessary packages for various languages and development tools
RUN apk update && \
    apk add --no-cache \
    build-base \
    gcc \
    g++ \
    openjdk11 \
    python3 \
    py3-pip \
    nodejs \
    npm

# Ensure python and pip point to python3
RUN ln -sf python3 /usr/bin/python && ln -sf pip3 /usr/bin/pip

# Install npm dependencies
COPY package.json . 
RUN npm install

# Copy project files
COPY . .

# Expose application port
EXPOSE 8000

# Default command
CMD ["node", "index.js"]
