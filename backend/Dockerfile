# Create image based on the official Node 6 image from the dockerhub
FROM node:latest

WORKDIR /app/backend
# Copy dependency definitions
COPY package.json /app/backend
# Install dependecies
RUN npm install
# Get all the code needed to run the app
COPY . .
# Expose the port the app runs in
EXPOSE 5000
# Serve the app
CMD ["npm", "start"]