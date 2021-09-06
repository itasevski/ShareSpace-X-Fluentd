FROM node:14-alpine AS frontend
ENV NODE_ENV frontend
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "npm", "start" ]