const sequelize = require('../client');
const User = require('./user');
const Church = require('./church');
const ChurchRevenue = require('./churchRevenue');
const UserConfig = require("./userConfig");

// Sincronizar os modelos com o banco de dados
sequelize.sync()
    .then(() => console.log('Banco de dados sincronizado.'))
    .catch(err => console.error('Erro ao sincronizar o banco de dados:', err));

module.exports = { sequelize, User, Church, ChurchRevenue, UserConfig };
