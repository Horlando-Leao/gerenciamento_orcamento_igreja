const { Op } = require('sequelize');
const { UserConfig } = require('../models');

async function findUsersByChurchIds(churchIds) {
    if (!Array.isArray(churchIds)) {
        throw new Error("churchIds deve ser um array de IDs.");
    }

    const regexPattern = `(^|,)(${churchIds.join('|')})(,|$)`;

    const users = await UserConfig.findAll({
        where: {
            churchsId: {
                [Op.regexp]: regexPattern
            }
        }
    });

    return users;
}

module.exports = { findUsersByChurchIds };
