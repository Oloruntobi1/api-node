FROM node:13.13.0

LABEL maintainer=blgntobi@gmail.com

ENV PORT=3000

COPY . var/code

WORKDIR  /var/code

RUN npm install

EXPOSE $PORT

# ENTRYPOINT [ "npm", "start" ]