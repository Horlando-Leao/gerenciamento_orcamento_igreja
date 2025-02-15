const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, 'databases', 'database.sqlite'),
    logging: false
});

module.exports = sequelize;
 