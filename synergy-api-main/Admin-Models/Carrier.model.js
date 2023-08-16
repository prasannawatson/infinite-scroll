const Sequelize = require("sequelize");
const sequelize = require("../db");

const Carrier = sequelize.define("sc_carriers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  carrierCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  carrierName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  carrierScac: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  carrierStatus: {
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

module.exports = Carrier;
