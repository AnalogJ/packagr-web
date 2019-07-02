# base image
FROM node:12.3.1

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
RUN npm install -g @angular/cli@latest

# add app
COPY . /app

# start app
CMD ng serve --host 0.0.0.0 --configuration local --port 4000
