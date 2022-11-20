FROM node

COPY . .

RUN npm i && \
    npm run build

ENTRYPOINT ["npm", "run", "preview"]
