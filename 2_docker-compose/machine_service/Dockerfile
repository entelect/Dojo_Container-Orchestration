FROM node:alpine
ENV MONGODB=mongo
ENV INTERVAL=1000
COPY package.json .
RUN npm install
COPY app.js .
CMD node app.js
