"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_uoms", [
      {
        uomName : "SHIPMENT",
        uomStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt :new Date(),
        updatedAt :new Date(),
      },
      {
        uomName : "CONTAINER",
        uomStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt :new Date(),
        updatedAt :new Date(),
      },
      {
        uomName : "CHARGEABLE WEIGHT",
        uomStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt :new Date(),
        updatedAt :new Date(),
      },
      {
        uomName : "W\/M",
        uomStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt :new Date(),
        updatedAt :new Date(),
      },
      {
        uomName : "CBM",
        uomStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt :new Date(),
        updatedAt :new Date(),
      },
      {
        uomName : "KILOGRAM",
        uomStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt :new Date(),
        updatedAt :new Date(),
      },
      {
        uomName : "DAYY",
        uomStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt :new Date(),
        updatedAt :new Date(),
      },
      {
        uomName : "PALLET",
        uomStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt :new Date(),
        updatedAt :new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_uoms", null, {});
  },
};
