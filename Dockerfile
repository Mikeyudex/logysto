FROM node:14 

WORKDIR /app

ENV PORT=2700
ENV SECRETKEY="logysto"
ENV APIKEY="58ce49234c2b40c68b86ed3605223957"
ENV APIKEYMAPBOX="pk.eyJ1IjoibWlndWVseXVkZXgiLCJhIjoiY2t6eDJyNnYyMDFqeDJ2cGw1Z2N3c3FieCJ9.-UWfUoWqctv1FL3TU-ImYg"

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

CMD [ "node" , "./dist/index.js"]