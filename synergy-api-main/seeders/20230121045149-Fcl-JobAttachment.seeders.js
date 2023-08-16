"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_fcl_job_attachments", [
      {
        id: 9,
        fclJobDetailsId: 7,
        fclJobBookingId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_fcl_job_attachments", null, {});
  },
};
