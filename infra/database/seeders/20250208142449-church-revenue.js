'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ChurchRevenues', [
      {
        id: 1,
        churchId: 1,
        userId: 1,
        date: '2025-02-01',
        amount: 500.00,
        type: "DÍZIMO",
        description: "dizimos",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        churchId: 2,
        date: '2025-02-02',
        amount: 750.50,
        type: "DÍZIMO",
        description: "dizimos",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:3,
        userId: 2,
        churchId: 2,
        date: '2025-02-03',
        amount: 1200.00,
        type: "OFERTA",
        description: "ofertas",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    
    console.log("✅ Seed de ChurchRevenues inserido com sucesso!");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ChurchRevenues', null, {});
    console.log("🗑️  Seed de ChurchRevenues removido com sucesso!");
  }
};
