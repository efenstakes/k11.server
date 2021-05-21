# base image for server
FROM node:12

# working directory where server will be
WORKDIR /usr/k11

# copy package.json files to install dependencies
COPY package*.json ./

# install dependencies
RUN npm install 

# copy server code to the container working directory
COPY . .

# expose port the server runs on
EXPOSE 4455

# start the server
CMD [ "npm", "start" ]