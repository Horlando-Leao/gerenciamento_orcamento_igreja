const sequelize = require('../database'); // Importa a conexão
const User = require('./user'); // Importa o modelo User

// Sincronizar os modelos com o banco de dados
sequelize.sync()
    .then(() => console.log('Banco de dados sincronizado.'))
    .catch(err => console.error('Erro ao sincronizar o banco de dados:', err));

module.exports = { sequelize, User };
