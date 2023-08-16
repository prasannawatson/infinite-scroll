"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sc_fcl_export_bookings", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      fclExportBookingNo: {
        type: Sequelize.BIGINT, //fcl-Export Booking Number
        allowNull: false,
      },
      fclExportCustomerIdFk: {
        type: Sequelize.INTEGER, //fcl-Export Customer ID Foreign Key
        allowNull: false,
      },
      fclExportRoutedBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fclExportSalesPerson: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fclExportPoRecieptFk: {
        type: Sequelize.INTEGER, //fcl-Export Port of Reciept Foreign Key
        allowNull: true,
      },
      fclExportPoLoading: {
        type: Sequelize.INTEGER, // fcl-Export Port of Loading
        allowNull: false,
      },
      fclExportPoDischarge: {
        type: Sequelize.INTEGER, // fcl-Export Port of Discharge
        allowNull: false,
      },
      fclExportPoDelivery: {
        type: Sequelize.INTEGER, // fcl-Export Port of Delivery
        allowNull: true,
      },
      fclExportAgentFk: {
        type: Sequelize.INTEGER, // fcl-Export Agent Foreign key
        allowNull: false,
      },
      fclExportShipperFk: {
        type: Sequelize.INTEGER, // fcl-Export Shipper Foreign key
        allowNull: false,
      },
      fclExportConsigneeFk: {
        type: Sequelize.INTEGER, // fcl-Export Consignee Foreign key
        allowNull: true,
      },
      fclExportNotifyFk: {
        type: Sequelize.INTEGER, // fclExport Notify Foreign key
        allowNull: true,
      },
      fclExportTosFk: {
        type: Sequelize.INTEGER, //fcl-Export Terms of Service Foreign key
        allowNull: false,
      },
      fclExportTerms: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fclExportMovement: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fclExportCommodity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fclExportMarksAndNumbers: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fclExportPiecesCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      fclExportPackageIdFk: {
        type: Sequelize.INTEGER, // fcl-Export Package Id Foreign key
        allowNull: true,
      },
      fclExportWeightKgs: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      fclExportWeightLbs: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      fclExportCft: {
        type: Sequelize.FLOAT, // fcl-Export Cubic feet
        allowNull: true,
      },
      fclExportLogIdFk: {
        type: Sequelize.FLOAT, // fcl-Export Log Id Foreing key
        allowNull: false,
      },
      fclExportCbm: {
        type: Sequelize.FLOAT, // fcl-Export Cubic meter
        allowNull: true,
      },
      fclExportContainerNameFk: {
        type: Sequelize.INTEGER, // fcl-Export Container Name Foreing key
        allowNull: false,
      },
      fclExportContainerCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fclExportinternalNotes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fclExportContainers: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      fclExportRoutingAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fclExportAgentAddres: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fclExportShipperAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fclExportConsigneeAddres: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fclExportNotifyAddres: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fclExportBookingDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      fclExportBookingStatus: {
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
    await queryInterface.dropTable("sc_fcl_export_bookings");
  },
};
