const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');
const roleUserEnum = require('./enums/roleUser');

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
    role: {
        type: DataTypes.ENUM,
        values: Object.values(roleUserEnum),
    },          
    churchsId: { // lista de ids separado por ,
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    timestamps: true
});

// Associações
UserConfig.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(UserConfig, { foreignKey: 'userId' }); 

module.exports = UserConfig;
