"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_liner_informations", [
      {
        id: 8,
        bookingIdFk: 8,
        linerName: 8,
        carrierBookingNumber: "R5566D",
        vesselName: 8,
        voyageNumber: "R555D",
        serviceContract: 3333,
        freightTerms: "CC",
        movementType: "DD",
        ETA: new Date(),
        ETD: new Date(),
        linerCutOff: new Date(),
        vgmCutOff: new Date(),
        portCutOff: new Date(),
        docsCutOff: new Date(),
        amsCutOff: new Date(),
        status: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_liner_informations", null, {});
  },
};
