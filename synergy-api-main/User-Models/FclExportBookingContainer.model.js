const Sequelize = require("sequelize");
const sequelize = require("../db");

const fclExportBookingContainer = sequelize.define(
  "sc_fcl_export_booking_containers",
  {
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
  }
);

module.exports = fclExportBookingContainer;
