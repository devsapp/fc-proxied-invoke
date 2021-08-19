FROM node:14.5.0-alpine3.11

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN apk --no-cache add curl
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./server.js ./


ENTRYPOINT [ "node", "server.js" ]
