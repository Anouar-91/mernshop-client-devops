FROM node:17.5.0-alpine3.15

WORKDIR /app

COPY package.json .
COPY package-lock.json .

WORKDIR /app
RUN npm install 
COPY . .


EXPOSE 3000

CMD ["npm", "start"]
