"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sc_fcl_charges", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      bookingIdFk: {
        type: Sequelize.INTEGER, // fcl-Booking ID Foreign Key
        allowNull: false,
      },
      chargesCodeIdFk: {
        type: Sequelize.INTEGER, // fcl-charges code ID Foreign Key
        allowNull: false,
      },
      chargePC: {
        type: Sequelize.STRING, // fcl-charges prepaid & collect
        allowNull: false,
      },
      chargeUomFk: {
        type: Sequelize.INTEGER, // fcl-charges Unit of Measurement Foreign Key
        allowNull: false,
      },
      chargeCurrencyFk: {
        type: Sequelize.INTEGER, // fcl-Charge Currency Foreign Key
        allowNull: false,
      },
      chargeROE: {
        type: Sequelize.INTEGER, //fcl-charge Rate of Exchange
        allowNull: false,
      },
      chargeUnit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      chargeSellRate: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      chargeBuyRate: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rcvblPartyName: {
        type: Sequelize.INTEGER, // fcl-Recievable Party Name
        allowNull: true,
      },
      pyblPartyName: {
        type: Sequelize.INTEGER, // fcl-Payable Party Name
        allowNull: true,
      },
      chargeComment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      chargeStatus: {
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
    await queryInterface.dropTable("sc_fcl_charges");
  },
};
