FROM node:18.20

WORKDIR /app

RUN adduser --disabled-password appuser

USER appuser

COPY --chown=appuser:appuser package.json package-lock.json postinstall.js ./

RUN npm install

COPY --chown=appuser:appuser . .

RUN whoami

RUN npm run build

EXPOSE 4173

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "4173"]
