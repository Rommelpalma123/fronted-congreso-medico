FROM node:14

WORKDIR /app

ENV VITE_API="https://backendcongresodev.onrender.com"

COPY package.json ./

RUN npm install -g vite

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
