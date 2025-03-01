const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importa a conexão do banco de dados
const Church = require('./church');  // Importa o modelo Church
const User = require('./user'); // Importa o modelo Church
const transactionTypeEnum = require('./enums/transactionType');

const ChurchRevenue = sequelize.define('ChurchRevenue', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    churchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Church,
            key: 'id'
        }
    },
    type: {
        type: DataTypes.ENUM,
        values: Object.values(transactionTypeEnum), // Usa os valores do ENUM
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

// Define o relacionamento entre Church e ChurchRevenue
Church.hasMany(ChurchRevenue, { foreignKey: 'churchId' });
ChurchRevenue.belongsTo(Church, { foreignKey: 'churchId' });

module.exports = ChurchRevenue;
