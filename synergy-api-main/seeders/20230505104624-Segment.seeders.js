'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pa_segments', 
    [
      {
       segmentCode: "LCLE",
       segmentName: "LCL EXPORTS",
       segmentType: "OCEAN",
       createdBy:1,
       modifiedBy:1,
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       segmentCode: "FCLE",
       segmentName: "FCL EXPORTS",
       segmentType: "OCEAN",
       createdBy:1,
       modifiedBy:1,
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       segmentCode: "LCLI",
       segmentName: "LCL IMPORTS",
       segmentType: "OCEAN",
       createdBy:1,
       modifiedBy:1,
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       segmentCode: "FCLI",
       segmentName: "FCL IMPORTS",
       segmentType: "OCEAN",
       createdBy:1,
       modifiedBy:1,
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       segmentCode: "AIRE",
       segmentName: "AIR EXPORTS",
       segmentType: "AIR",
       createdBy:1,
       modifiedBy:1,
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       segmentCode: "AIRI",
       segmentName: "AIR IMPORTS",
       segmentType: "AIR",
       createdBy:1,
       modifiedBy:1,
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       segmentCode: "TRUI",
       segmentName: "TRUCKING INBOUND",
       segmentType: "ALL",
       createdBy:1,
       modifiedBy:1,
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       segmentCode: "TRUO",
       segmentName: "TRUCKING OUTBOUND",
       segmentType: "ALL",
       createdBy:1,
       modifiedBy:1,
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       segmentCode: "CROA",
       segmentName: "CROSS COUNTRY AIR ",
       segmentType: "AIR",
       createdBy:1,
       modifiedBy:1,
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       segmentCode: "CROF",
       segmentName: "CROSS COUNTRY FCL ",
       segmentType: "OCEAN",
       createdBy:1,
       modifiedBy:1,
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       segmentCode: "CROL",
       segmentName: "CROSS COUNTRY LCL ",
       segmentType: "OCEAN",
       createdBy:1,
       modifiedBy:1,
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       segmentCode: "CUSI",
       segmentName: "CUSTOM CLEARANCE IMPORTS",
       segmentType: "ALL",
       createdBy:1,
       modifiedBy:1,
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       segmentCode: "CUSE",
       segmentName: "CUSTOM CLEARANCE EXPORTS",
       segmentType: "ALL",
       createdBy:1,
       modifiedBy:1,
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       segmentCode: "WARH",
       segmentName: "WAREHOUSE",
       segmentType: "ALL",
       createdBy:1,
       modifiedBy:1,
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       segmentCode: "SERJ",
       segmentName: "SERVICE JOB",
       segmentType: "ALL",
       createdBy:1,
       modifiedBy:1,
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
       segmentCode: "PROJ",
       segmentName: "PROJECT CARGO",
       segmentType: "ALL",
       createdBy:1,
       modifiedBy:1,
       createdAt: new Date(),
       updatedAt: new Date()
      }
     ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pa_segments', null, {});
  }
};
