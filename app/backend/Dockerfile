FROM node:16.14-alpine

WORKDIR /app-backend

COPY package* ./

RUN npm install

COPY . .

EXPOSE 3001

### RUN npx tsc - build do packege.json '/bin/sh tsc_eval.sh'

CMD ["npm", "start"]
