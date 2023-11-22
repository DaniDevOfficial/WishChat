FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port on which your app runs
EXPOSE 3000

# Define environment variable for the port (optional)
ENV PORT 3000

# CMD specifies the command to run on startup
CMD ["npm", "start"]
