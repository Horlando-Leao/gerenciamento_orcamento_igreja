'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserConfigs', [
      {
        id: 1,
        userId: 1,
        role: "ADMINISTRADOR", // Usuário 1 tem acesso às igrejas 1 e 2 como admin
        churchsId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 2,
        role: "DIRIGENTE_IGREJA",
        churchsId: "1",
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
