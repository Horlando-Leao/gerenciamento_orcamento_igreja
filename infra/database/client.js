const { Sequelize } = require('sequelize');
const path = require('path');
const configDB = require('../../config/config');


const sequelize = new Sequelize({
    dialect: configDB.dialect,
    storage: path.resolve(configDB.storage),
    logging: true
});

module.exports = sequelize;
 