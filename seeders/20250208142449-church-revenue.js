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
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        churchId: 2,
        date: '2025-02-02',
        amount: 750.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:3,
        userId: 2,
        churchId: 2,
        date: '2025-02-03',
        amount: 1200.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});                                                               
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ChurchRevenues', null, {});
  }
};
