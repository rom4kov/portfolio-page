FROM node:18.20

WORKDIR /app

COPY package.json package-lock.json postinstall.js ./

RUN npm install

COPY . .

RUN whoami > whoami.txt

RUN npm run build

EXPOSE 4173

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "4173"]
