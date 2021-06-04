FROM node:14-buster

RUN apt-get update && \
    apt-get install -y build-essential \
    wget \
    make \
    gcc \
    libc6-dev

WORKDIR /opt
COPY package*.json ./
COPY config/default.ts config/production.ts

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]
