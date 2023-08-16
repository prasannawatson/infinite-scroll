'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sc_carrier_types', [{
      carrierTypeName: "AIR",
      createdBy: 1,
      modifiedBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      carrierTypeName: "OCEAN",
      createdBy: 1,
      modifiedBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      carrierTypeName: "ALL",
      createdBy: 1,
      modifiedBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sc_carrier_types', null, {});
  }
};
