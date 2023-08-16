"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sc_fcl_vas", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      bookingIdFk: {
        type: Sequelize.INTEGER, //Bookig ID Foreign Key
        allowNull: false,
      },
      customerNameIdFk: {
        type: Sequelize.INTEGER, //Customer Name Id Foreign key
        allowNull: false,
      },
      truckerName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      truckerPhone: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      truckerMobile: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      truckerMail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      truckerAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      containerPickUp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stuffingAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      containerDelivery: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pickupPlace: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contactPerson: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contactPhone: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      contactMobile: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      contactMail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pickupDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      pickupTime: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      pickupAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vasStatus: {
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
    await queryInterface.dropTable("sc_fcl_vas");
  },
};
