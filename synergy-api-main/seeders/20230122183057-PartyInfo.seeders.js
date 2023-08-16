"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_fcl_partyinfos", [
      {
        id: 2,
        bookingIdFk: 2,
        prepaidName: 2,
        prepaidAddress: "STRONGVILLE, OH",
        collectName: "2",
        collectAddress: "13/F., PARK SUN BUILDING, 97-107 WO YI HOP ROAD,",
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_fcl_partyinfos", null, {});
  },
};
