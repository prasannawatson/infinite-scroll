'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("sc_package_tbls",
    [
      {
        packageName : "BOX",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        packageName : "ENVELOPE",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        packageName : "PALLET",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        packageName : "CRATE",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        packageName : "SKID",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        packageName : "TUBE",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        packageName : "CASE",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        packageName : "REEL",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        packageName : "CONTAINER",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        packageName : "DRUM",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        packageName : "CYLINDER",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        packageName : "PAIL",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        packageName : "TANK",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        packageName : "PIECE",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        packageName : "LOOSE",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        packageName : "CARTON",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        packageName : "ROLL",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        packageName : "BUCKET",
        packageStatus : true,
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ]
    , {});
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sc_package_tbls', null, {});
  }
};
