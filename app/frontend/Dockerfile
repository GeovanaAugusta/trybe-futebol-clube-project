# FROM node:16.14-alpine
# WORKDIR /app-frontend
#  ...
#

FROM node:16.14-alpine

WORKDIR /app-frontend

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# SOURCE 
#  https://medium.com/@luanrubensf/criando-um-ambiente-de-desenvolvimento-front-end-com-docker-2f33e9f8dd8
# FROM node:alpine
# WORKDIR '/app'
# COPY package.json .
# RUN npm install
# COPY . .
# EXPOSE 4200
# CMD ["npm", "run", "start"]