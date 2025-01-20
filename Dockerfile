FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "my-express-app/index.js"] 