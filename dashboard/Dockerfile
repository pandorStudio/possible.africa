# Specidie the base image to be installed from docker hub
FROM node:18-alpine

# Create a directory to store the application code inside the image
WORKDIR /app

# Layer caching 
COPY package.json .
RUN npm install

# Copy the package.json and package-lock.json files to the image
COPY . .

# Install the dependencies
# RUN npm install

# Expose the port 5173
EXPOSE 5173

# Run the application
CMD [ "npm", "run", "dev" ]