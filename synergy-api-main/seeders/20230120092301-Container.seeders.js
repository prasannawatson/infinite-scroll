"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_containers", [
      {
        containerName : "20` DRY ",
        maxKG : 24000,
        maxCBM : 33,
        status : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        containerName : "40` DRY ",
        maxKG : 30000,
        maxCBM : 68,
        status : true,
        createdBy : null,
        modifiedBy : null,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        containerName : "40` HIGH CUBE DRY ",
        maxKG : 30000,
        maxCBM : 76,
        status : true,
        createdBy : null,
        modifiedBy : null,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        containerName : "20` OPEN TOP",
        maxKG : 24000,
        maxCBM : 33,
        status : true,
        createdBy : null,
        modifiedBy : null,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        containerName : "40` OPEN TOP",
        maxKG : 30000,
        maxCBM : 68,
        status : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        containerName : "40` OPEN TOP HIGH CUBE",
        maxKG : 32500,
        maxCBM : 75,
        status : true,
        createdBy : null,
        modifiedBy : null,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        containerName : "20` FLAT RACK",
        maxKG : 31000,
        maxCBM : 0,
        status : true,
        createdBy : null,
        modifiedBy : null,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        containerName : "40` FLAT RACK",
        maxKG : 39000,
        maxCBM : 0,
        status : true,
        createdBy : null,
        modifiedBy : null,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        containerName : "20` REEFER",
        maxKG : 24000,
        maxCBM : 27,
        status : true,
        createdBy : null,
        modifiedBy : null,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        containerName : "40` REEFER",
        maxKG : 30000,
        maxCBM : 57,
        status : true,
        createdBy : null,
        modifiedBy : null,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        containerName : "40` HIGH CUBE REEFER",
        maxKG : 34000,
        maxCBM : 68,
        status : true,
        createdBy : null,
        modifiedBy : null,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        containerName : " 20` TANK",
        maxKG : 31000,
        maxCBM : 0,
        status : true,
        createdBy : null,
        modifiedBy : null,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        containerName : "40` TANK",
        maxKG : 31000,
        maxCBM : 0,
        status : true,
        createdBy : null,
        modifiedBy : null,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        containerName : "45` HIGH CUBE DRY",
        maxKG : 30000,
        maxCBM : 86,
        status : true,
        createdBy : null,
        modifiedBy : null,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        containerName : "ALL",
        maxKG : 0,
        maxCBM : 0,
        status : true,
        createdBy : null,
        modifiedBy : null,
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_containers", null, {});
  },
};
