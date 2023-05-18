# https://nodejs.org/en/docs/guides/nodejs-docker-webapp
# https://dev.to/dariansampare/setting-up-docker-typescript-node-hot-reloading-code-changes-in-a-running-container-2b2f

FROM node:20 

# Create app directory
WORKDIR /usr/app

##########################################################

# Install app dependencies
COPY ./package*.json .
COPY ./tsconfig.json tsconfig.json
RUN npm ci

##########################################################

# Copy over app
COPY . . 

# Build app
RUN npm run build
RUN npm ci --production

# Start app
ENV NODE_PATH=./dist
ENV NODE_ENV production
EXPOSE 3000
CMD ["npm", "run", "start"]