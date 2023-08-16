"use strict";

const { create, update } = require("lodash");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_fcl_export_booking_containers", [
      {
        id: 24,
        fclExportBookingNo: 14,
        fclExportContainerNameFk: 12,
        fclTotalContainersCount: 8,
        fclExportContainerCount: 10,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(
      "sc_fcl_export_booking_containers",
      null,
      {}
    );
  },
};
