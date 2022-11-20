FROM node

COPY . .

RUN npm i && \
    npm build

ENTRYPOINT ["npm", "preview"]
