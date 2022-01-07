FROM node:15
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
  then npm install; \
  else npm instal --only=production; \
  fi


RUN chown -R node:node /app/node_modules

#build client if in production
RUN if ["$NODE_ENV" = "production" ]; \
  then npm run build; \
  fi

EXPOSE $PORT
CMD ["npm", "run", "start"]

