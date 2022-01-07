FROM node:15
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
  then npm install;  \
  npm install -g nodemon; \
  else npm instal --only=production; \
  fi

COPY . ./
ENV PORT 5000
EXPOSE $PORT
CMD ["node", "src/server.js"]