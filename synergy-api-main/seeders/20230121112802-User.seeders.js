"use strict";


const bcrypt = require('bcrypt');

const tokenList = {}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt();
    return queryInterface.bulkInsert('users',
    [
      {
        
        firstName : "Admin",
        lastName : "Portal",
        userName : "admin",
        email : "admin@synergy.com",
        mobile : "988608028",
        password : await bcrypt.hash('123456', salt),
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        
        firstName : "User",
        lastName : "Portal",
        userName : "admin",
        email : "user@synergy.com",
        mobile : "988608028",
        password : await bcrypt.hash('123456', salt),
        createdBy : 1,
        modifiedBy : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
    ]
    
     );
  
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
