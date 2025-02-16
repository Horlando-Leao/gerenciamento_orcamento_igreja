const { Sequelize } = require('sequelize');
const path = require('path');
const { config } = require('./config/config');

const sequelize = new Sequelize({
    dialect: config.development.dialect,
    storage: config.development.storage,
    logging: false
});

module.exports = sequelize;
 