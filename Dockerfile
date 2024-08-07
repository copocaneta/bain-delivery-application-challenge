FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN echo 'DATABASE="development"' > .env
COPY . .
RUN npm rebuild sqlite3
RUN npm run build
RUN node scripts/init-db.js
EXPOSE 3000
CMD ["npm", "run", "start"]
