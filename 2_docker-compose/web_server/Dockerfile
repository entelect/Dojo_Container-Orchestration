FROM node
ENV MONGODB=mongo
EXPOSE 8080
COPY package.json .
RUN npm install
COPY views ./views
COPY server.js .
CMD node server.js
