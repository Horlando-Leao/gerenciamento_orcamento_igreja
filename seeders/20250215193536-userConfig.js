'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserConfigs', [
      {
        id: 1,
        userId: 1,
        roles: JSON.stringify({ "churchsId": [1, 2], "role": "admin" }), // Usuário 1 tem acesso às igrejas 1 e 2 como admin
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 2,
        roles: JSON.stringify({ "churchsId": [1, 3], "role": "editor" }), // Usuário 2 acessa igrejas 1 e 3 como editor
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

    console.log("✅ Seed de UserConfig inserido com sucesso!");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserConfigs', null, {});
    console.log("🗑️  Seed de UserConfig removido com sucesso!");
  }
};
