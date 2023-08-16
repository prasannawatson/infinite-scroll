const Sequelize = require("sequelize");
const sequelize = require("../db");

const files = sequelize.define("sc_files", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  fclBookingIdFk: {
    type: Sequelize.INTEGER, // fcl-Booking ID Foreign Key
    allowNull: false,
  },
  documentUploadName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  documentCategory: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  documentCreatedTime: {
    type: Sequelize.STRING,
    allowNull: false,
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

module.exports = files;
