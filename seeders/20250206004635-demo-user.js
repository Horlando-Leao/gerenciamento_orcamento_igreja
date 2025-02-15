'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Horlando Leão',
        email: 'horlando@example.com',
        password: 'senha123', // Certifique-se de usar o hash de senha real, não uma senha em texto simples
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Laryssa Silva',
        email: 'laryssa@example.com',
        password: 'senha456', // Certifique-se de usar o hash de senha real
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    
    console.log("✅ Seed de Users inserido com sucesso!");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    console.log("🗑️  Seed de Users removido com sucesso!");
  }
};
