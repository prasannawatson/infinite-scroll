'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("pa_logins", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      paFirstName: {
        type: Sequelize.STRING, //Power Admin First Name
        allowNull: false,
      },
      paLastName: {
        type: Sequelize.STRING, //Power Admin Last Name
        allowNull: false,
      },
      paUserName: {
        type: Sequelize.STRING, //Power Admin user Name
        allowNull: true,
      },
      paEmail: {
        type: Sequelize.STRING, //Power Admin Email-Id
        allowNull: false,
      },
      paContactNumber: {
        type: Sequelize.BIGINT, //Power Admin Contact Number
        allowNull: false,
      },
      paPassword: {
        type: Sequelize.TEXT, //Power Admin Password
        allowNull: false,
      },
      paStatus: {
        type: Sequelize.STRING, //Power Admin status
        allowNull: false,
      },
      role:{
        type:Sequelize.TEXT,
        allowNull:false
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      modifiedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.createTable("pa_logins", {});
  }
};
