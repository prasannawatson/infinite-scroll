"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_fcl_charges", [
      {
        id: 17,
        bookingIdFk: 5,
        chargesCodeIdFk: 36,
        chargePC: "CC",
        chargeUomFk: 7,
        chargeCurrencyFk: 2,
        chargeROE: 1,
        chargeUnit: 32,
        chargeSellRate: 5352,
        chargeBuyRate: 23,
        rcvblPartyName: 2,
        pyblPartyName: 2,
        chargeComment: "NA",
        chargeStatus: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_fcl_charges", null, {});
  },
};
