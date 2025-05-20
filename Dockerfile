FROM node:23.11.0-alpine

RUN apk update && apk add --no-cache \
    git \
    wget \
    unzip \
    curl \
    python3 \
    py3-pip \
    openjdk17

WORKDIR /app

COPY package.json package-lock.json ./

RUN rm -rf ./node_modules ./expo

RUN npm install

RUN npm add expo-cli

RUN apk add --no-cache libc6-compat

COPY . .

EXPOSE 19000 19001 19002

CMD ["npx", "expo", "start", "--tunnel", "--clear"]