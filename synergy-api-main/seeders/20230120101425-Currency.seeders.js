"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_currencies", [
      {
        currencyCode: "USD",
        currencyROE: 74,
        currencyValidity: new Date(),
        currencyStatus: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currencyCode: "INR",
        currencyROE: 1,
        currencyValidity: new Date(),
        currencyStatus: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currencyCode: "EUR",
        currencyROE: 88,
        currencyValidity: new Date(),
        currencyStatus: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currencyCode: "AED",
        currencyROE: 20,
        currencyValidity: new Date(),
        currencyStatus: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currencyCode: "GBP",
        currencyROE: 102,
        currencyValidity: new Date(),
        currencyStatus: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        currencyCode: "CAD",
        currencyROE: 80,
        currencyValidity: new Date(),
        currencyStatus: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_currencies", null, {});
  },
};
