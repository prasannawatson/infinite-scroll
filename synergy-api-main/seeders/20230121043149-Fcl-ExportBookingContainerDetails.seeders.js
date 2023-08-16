"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "sc_fcl_export_booking_container_details",
      [
        {
          id: 29,
          fclExportBookingNo: 10,
          fclContainerNo: "qwjyfhvf",
          fclSealNo: "jdfjfcqw",
          fclContainerTypeFk: 34,
          fclPieces: 65,
          fclPackageTypeFk: 2,
          fclWeightLbs: 35234,
          fclWeightKgs: 54,
          fclCft: 54,
          fclCbm: 54,
          fclContainerStatus: true,
          modifiedBy: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(
      "sc_fcl_export_booking_container_details",
      null,
      {}
    );
  },
};
