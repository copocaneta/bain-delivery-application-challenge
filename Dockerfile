# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Rebuild sqlite3 module to ensure compatibility
RUN npm rebuild sqlite3

# Build the production version of the application
RUN npm run build

# Ensure the database is initialized
RUN node scripts/init-db.js

# Expose the application port
EXPOSE 3000

# Command to run the application in production mode
CMD ["npm", "run", "start"]
