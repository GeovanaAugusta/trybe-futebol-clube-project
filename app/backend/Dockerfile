# FROM node:16.14-alpine
# WORKDIR /app-backend
#  ...

FROM node:16.14-alpine

WORKDIR /app-backend

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]



# SOURCE 
# STRANGER THINGS PROJECT - Backend
# https://medium.com/@luanrubensf/criando-um-ambiente-de-desenvolvimento-front-end-com-docker-2f33e9f8dd8

