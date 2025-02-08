'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Churches', [
      {
        id: 1,
        name: 'Igreja Batista Central',
        address: 'Rua das Flores, 123',
        city: 'Recife',
        state: 'PE',
        country: 'Brasil',
        phone: '(81) 99999-9999',
        email: 'contato@ibcentral.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Igreja Presbiteriana Renovada',
        address: 'Avenida Brasil, 456',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        phone: '(11) 98888-8888',
        email: 'contato@iprenovada.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Igreja Assembleia de Deus',
        address: 'Rua Esperança, 789',
        city: 'Fortaleza',
        state: 'CE',
        country: 'Brasil',
        phone: '(85) 97777-7777',
        email: 'contato@adfortaleza.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Churches', null, {});
  }
};

