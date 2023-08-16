"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sc_sailing_schedules", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      POL: {
        type: Sequelize.INTEGER, //Port Of ladding
        allowNull: false,
      },
      POD: {
        type: Sequelize.INTEGER, //Port of Delivery
        allowNull: false,
      },
      linerName: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vesselName: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ETA: {
        type: Sequelize.DATEONLY, // Estimated  Time Of Arrival
        allowNull: true,
      },
      ETD: {
        type: Sequelize.DATEONLY, // Estimated  Time Of Delivery
        allowNull: true,
      },
      linerCutOff: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      vgmCutOff: {
        type: Sequelize.DATEONLY, //Verified gross mass Cutoff
        allowNull: true,
      },
      portCutOff: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      docsCutOff: {
        type: Sequelize.DATEONLY, //Documents CutOff
        allowNull: true,
      },
      amsCutOff: {
        type: Sequelize.DATEONLY, //Automated manifest System Cutoff
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sc_sailing_schedules");
  },
};
