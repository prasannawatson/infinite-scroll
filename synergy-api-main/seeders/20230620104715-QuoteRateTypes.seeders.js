'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sc_quote_rate_type',
      [
        {
          rateType: "CONTRACT",
          createdBy: 1,
          modifiedBy: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          rateType: "TARRIF",
          createdBy: 1,
          modifiedBy: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          rateType: "PROMO",
          createdBy: 1,
          modifiedBy: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sc_quote_rate_type', null, {});
  }
};
