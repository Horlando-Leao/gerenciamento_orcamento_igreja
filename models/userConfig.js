const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const UserConfig = sequelize.define('UserConfig', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    roles: {
        type: DataTypes.JSONB, // Estrutura JSON para armazenar permissões
        allowNull: false,
        defaultValue: {
            churchsId: [],
            role: "visualizador"
        }
    }
}, {
    timestamps: true
});

// Associações
UserConfig.belongsTo(User, { foreignKey: 'userId' });

module.exports = UserConfig;
