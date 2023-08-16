'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sc_charge_types', [{
      chargeTypeName: "COMMON",
      createdBy: 1,
      modifiedBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      chargeTypeName: "FREIGHT",
      createdBy: 1,
      modifiedBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sc_charge_types', null, {});
  }
};
