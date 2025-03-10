#!/bin/bash

# Definir variáveis
REPO_URL="git@github.com:Horlando-Leao/gerenciamento_orcamento_igreja.git"
PROJECT_DIR="gerenciamento_orcamento_igreja"

# Remover a pasta do projeto caso exista
echo "🗑️ Removendo a pasta antiga..."
rm -rf $PROJECT_DIR

# Clonar o repositório novamente
echo "📥 Clonando o repositório..."
git clone $REPO_URL

# Entrar na pasta do projeto
cd $PROJECT_DIR || exit 1

# Instalar dependências do Node.js
echo "📦 Instalando dependências..."
npm install

# Rodar o projeto em background
echo "🚀 Iniciando o projeto em background..."
nohup npm run start > output.log 2>&1 &

echo "✅ Deploy finalizado! O projeto está rodando em background."
