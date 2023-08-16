'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sc_quote_status',
      [
        {
          statusType: "CREATED",
          createdBy: 1,
          modifiedBy: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          statusType: "APPROVED",
          createdBy: 1,
          modifiedBy: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          statusType: "AWAITING CONFIRMATION",
          createdBy: 1,
          modifiedBy: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          statusType: "LOST",
          createdBy: 1,
          modifiedBy: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          statusType: "BOOKING",
          createdBy: 1,
          modifiedBy: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sc_quote_status', null, {});
  }
};
