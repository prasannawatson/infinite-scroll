"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_release_dates", [
      {
        id: 2,
        fclExportBookingNo: 2,
        fclExportContainerNameFk: 2,
        releaseDate: new Date(),
        status: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_release_dates", null, {});
  },
};
