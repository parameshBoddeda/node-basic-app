FROM node:alpine

# Copy the application files to the container
COPY ./ ./

# Install dependencies
RUN npm install

# Copy the stop script to the container
COPY stop-server.sh /

# Set the entrypoint to the stop script
ENTRYPOINT ["/stop-server.sh"]

# Set the default command to start the server
CMD ["npm", "start"]
