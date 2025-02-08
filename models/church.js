const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importa a conexão

const Church = sequelize.define('Church', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Brasil"
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true // Valida se é um e-mail válido
        }
    }
}, {
    timestamps: true // Cria colunas createdAt e updatedAt automaticamente
});

module.exports = Church;
