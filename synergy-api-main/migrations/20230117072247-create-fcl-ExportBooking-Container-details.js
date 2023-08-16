"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable( "sc_fcl_export_booking_container_details", {
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
        fclContainerNo: {
          type: Sequelize.STRING, // fcl-Container Number
          allowNull: false,
        },
        fclSealNo: {
          type: Sequelize.STRING, // fcl-Seal Number
          allowNull: false,
        },
        fclContainerTypeFk: {
          type: Sequelize.INTEGER, // fcl-Container Type Foreign key
          allowNull: false,
        },
        fclPieces: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        fclPackageTypeFk: {
          type: Sequelize.INTEGER, // fcl-Package Type Foreign key
          allowNull: false,
        },
        fclWeightLbs: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        fclWeightKgs: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        fclCft: {
          type: Sequelize.FLOAT, // fcl-Cubic feet
          allowNull: true,
        },
        fclCbm: {
          type: Sequelize.FLOAT, //fcl-Cubic meter
          allowNull: true,
        },
        fclContainerStatus: {
          type: Sequelize.STRING,
          allowNull: true,
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
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sc_fcl_export_booking_container_details");
  },
};
