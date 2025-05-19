FROM node:23.11.0-alpine

# Instalação de ferramentas necessárias (versão Alpine)
RUN apk update && apk add --no-cache \
    git \
    wget \
    unzip \
    curl \
    python3 \
    py3-pip \
    openjdk17

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package.json package-lock.json ./

RUN rm -rf ./node_modules ./expo

# Instala as dependências
RUN npm install

# Instala o Expo CLI globalmente
RUN npm add expo-cli

RUN apk add --no-cache libc6-compat

# Copia o restante do projeto
COPY . .

# Expõe as portas padrão do Expo
EXPOSE 19000 19001 19002

# Comando padrão (você pode trocar para npx, se quiser)
CMD ["npx", "expo", "start", "--tunnel", "--clear"]