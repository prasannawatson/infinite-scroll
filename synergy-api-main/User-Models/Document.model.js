const Sequelize = require("sequelize");
const sequelize = require("../db");

const documents = sequelize.define("sc_document_infos", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  documentCategory: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  documentUploadName: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  fclBookingIdFk: {
    type: Sequelize.INTEGER, // fcl Booking Id Foreign Key
    allowNull: false,
  },
  documentCreatedTime: {
    type: Sequelize.DATE,
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

module.exports = documents;
