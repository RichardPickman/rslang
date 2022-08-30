FROM node:lts

WORKDIR /usr/local/

COPY ./dist ./dist
COPY ./files ./files
COPY ./doc ./doc
COPY package.json .
COPY .env .

RUN npm install --production

CMD ["node", "./dist/server.js"]

EXPOSE 8080
