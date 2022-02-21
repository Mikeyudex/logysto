FROM node:14 

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

CMD [ "node" , "./dist/index.js"]