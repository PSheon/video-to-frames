FROM node:14-buster

RUN apt-get update && \ 
    apt-get install -y build-essential \
    wget \
    make \
    gcc \ 
    libc6-dev 

WORKDIR /opt
COPY package*.json ./
RUN npm install

COPY . .
COPY config/default.js config/production.js

CMD [ "npm", "run", "start" ]
