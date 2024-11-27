FROM node:18.20

WORKDIR /app

RUN adduser --disabled-password appuser

USER appuser

COPY --chown=appuser:appuser package.json package-lock.json postinstall.js ./

RUN --chown=appuser:appuser npm install

COPY --chown=appuser:appuser . .

RUN whoami

RUN --chown=appuser:appuser npm run build

EXPOSE 4173

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "4173"]
