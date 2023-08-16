"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sc_fcl_export_booking_containers", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      fclExportBookingNo: {
        type: Sequelize.BIGINT, // fcl-Export Booking Number
        allowNull: false,
      },
      fclExportContainerNameFk: {
        type: Sequelize.INTEGER, // fcl-Export Container Name Foreign key
        allowNull: false,
      },
      fclTotalContainersCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fclExportContainerCount: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("sc_fcl_export_booking_containers");
  },
};
