FROM node:22

WORKDIR /app

COPY front/package*.json ./

RUN npm install -g npm@latest

RUN npm install --verbose

COPY front/. .

EXPOSE 33445
 
CMD ["npm", "run", "dev"]