#production
#FROM docker.uclv.cu/node:latest
#WORKDIR /app
#COPY . .
## Arguments
#EXPOSE 3000

#deploy
FROM docker.uclv.cu/node:latest
WORKDIR /app
COPY . .
EXPOSE 3000