// Carregar configurações do Sequelize
const config = require('./config.json');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

module.exports =  dbConfig;

