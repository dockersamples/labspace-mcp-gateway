FROM node:lts-slim
WORKDIR /usr/local/app
COPY package*.json ./
RUN npm install
COPY ./src ./src
EXPOSE 3000
CMD ["node", "src/index.js"]