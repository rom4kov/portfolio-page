FROM node:18.20

WORKDIR /app

RUN chown -R node:node /app/dist

COPY package.json package-lock.json postinstall.js ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "4173"]
