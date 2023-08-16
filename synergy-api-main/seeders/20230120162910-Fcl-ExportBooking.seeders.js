"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_fcl_export_bookings", [
      {
        id: 11,
        fclExportBookingNo: 32252,
        fclExportCustomerIdFk: 23,
        fclExportRoutedBy: "Overseas",
        fclExportSalesPerson: 2,
        fclExportPoRecieptFk: 23,
        fclExportPoLoading: 32,
        fclExportPoDischarge: 23,
        fclExportPoDelivery: 4,
        fclExportAgentFk: 50,
        fclExportShipperFk: 12,
        fclExportConsigneeFk: 231,
        fclExportNotifyFk: 45,
        fclExportTosFk: 12,
        fclExportTerms: "Prepaid",
        fclExportMovement: "DP",
        fclExportCommodity: "Electronics",
        fclExportMarksAndNumbers: "NA",
        fclExportPiecesCount: 43,
        fclExportPackageIdFk: 1,
        fclExportWeightKgs: 80348,
        fclExportWeightLbs: 58786,
        fclExportCft: 1987,
        fclExportLogIdFk: 1,
        fclExportCbm: 56,
        fclExportContainerNameFk: 1,
        fclExportContainerCount: 1,
        fclExportinternalNotes: "TEST",
        fclExportContainers: null,
        fclExportRoutingAddress: "556 SEQUOIA TRAIL, ROSELLE,",
        fclExportAgentAddres: "556 SEQUOIA TRAIL, ROSELLE,",
        fclExportShipperAddress: "556 SEQUOIA TRAIL, ROSELLE,",
        fclExportConsigneeAddres: "6 LIBERTY SQUARE #2202, BOSTON,",
        fclExportNotifyAddres: "6 LIBERTY SQUARE #2202, BOSTON,",
        fclExportBookingDate: new Date(),
        fclExportBookingStatus: true,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_fcl_export_bookings", null, {});
  },
};
