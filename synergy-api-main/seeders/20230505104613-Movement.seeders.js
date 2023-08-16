'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('pa_movement_type', 
     [
      {
       movementType: "DOOR - DOOR",
       createdBy:1,
       modifiedBy:1,
       createdAt:new Date(),
       updatedAt:new Date()
      },
      {
       movementType: "DOOR - PORT",
       createdBy:1,
       modifiedBy:1,
       createdAt:new Date(),
       updatedAt:new Date()
      },
      {
       movementType: "PORT - PORT",
       createdBy:1,
       modifiedBy:1,
       createdAt:new Date(),
       updatedAt:new Date()
      },
      {
       movementType: "PORT - DOOR",
       createdBy:1,
       modifiedBy:1,
       createdAt:new Date(),
       updatedAt:new Date()
      },
      {
         movementType: "ALL",
         createdBy:1,
         modifiedBy:1,
         createdAt:new Date(),
         updatedAt:new Date()
        }
  ]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('pa_movement_type', null, {});
     
  }
};
