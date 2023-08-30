FROM docker.uclv.cu/node:latest
WORKDIR /app
COPY package*.json ./
#RUN npm install
COPY . .
#RUN npm run build
#CMD ["npm", "run", "start"]
CMD ["npm", "run", "dev"]