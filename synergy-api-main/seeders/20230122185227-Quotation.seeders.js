"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_quotations", [
      {
        id: 2,
        qoutationNumber: "QNABC2023012051215",
        customerNameIdFk: 2,
        routedBy: "Overseas",
        salesPersonIdFk: 2,
        createdEmployeeIdFk: 2,
        freights: "Air Export",
        validFrom: new Date(),
        validTill: new Date(),
        freightStatus: "OPEN",
        createdDate: new Date(),
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_quotations", null, {});
  },
};
