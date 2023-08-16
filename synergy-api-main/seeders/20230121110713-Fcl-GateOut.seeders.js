"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_gate_outs", [
      {
        id: 5,
        fclExportBookingNo: 5,
        fclExportContainerNameFk: 5,
        containerNumber: 12345,
        terminalName: "port-3",
        gateOutDate: new Date(),
        status: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_gate_outs", null, {});
  },
};
