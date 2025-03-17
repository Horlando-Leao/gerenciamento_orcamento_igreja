FROM node:22.13.1

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Instala o mysql-client para ter o mysqldump
RUN apt-get update && apt-get install -y mysql-client && rm -rf /var/lib/apt/lists/*


# Copia os arquivos de dependências
COPY package*.json ./

# Define a variável de build NODE_ENV com padrão "production"
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Instala as dependências conforme o ambiente
RUN if [ "$NODE_ENV" = "production" ]; then npm install --production; else npm install; fi

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta do app
EXPOSE 3000

# Comando de inicialização condicional:
# Em produção, roda "npm start"; em desenvolvimento, "npm run dev"
CMD [ "sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm start; else npm run dev; fi" ]
