# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.18.0
FROM node:${NODE_VERSION}-slim as base

WORKDIR /app
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp openssl pkg-config python-is-python3
    # LABEL fly_launch_runtime="Node.js/Prisma"

COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
# Set production environment
ENV NODE_ENV="production"
ENV PORT=3000

# Install node modules

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start" ]
