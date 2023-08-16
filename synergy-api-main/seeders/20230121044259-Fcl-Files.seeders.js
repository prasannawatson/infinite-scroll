"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_files", [
      {
        id: 7,
        fclBookingIdFk: 7,
        documentUploadName: "SC-2022-12-02-Validation Sheet (3).xlsx",
        documentCategory: "Commercial Invoice",
        documentCreatedTime: "Fri Dec 02 2022 12:11:27 GMT+0530 (India Standard Time)",
        status: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_files", null, {});
  },
};
