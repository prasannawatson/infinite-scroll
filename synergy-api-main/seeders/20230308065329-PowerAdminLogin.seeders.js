'use strict';
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt();
    return queryInterface.bulkInsert("pa_logins", [
      {
        paFirstName: 'Arun',
        paLastName: 'Kumar',
        paUserName: 'Arun Kumar',
        paEmail: 'poweradmin@synergy.com',
        paContactNumber: '7755332211',
        paPassword: await bcrypt.hash('poweradmin@1234', salt),
        role:'PowerAdmin',
        paStatus:true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("pa_logins", null, {});
  }
};
