FROM node:14.16.0-alpine3.10 AS alpine

# Here be stuff..
ENV CI=true

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .
CMD ["npm", "start"]