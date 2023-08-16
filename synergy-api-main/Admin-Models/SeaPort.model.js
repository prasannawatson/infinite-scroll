const Sequelize = require("sequelize");
const sequelize = require("../db");

const seaPort = sequelize.define("sc_seaports", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  seaPortCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  seaPortName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  seaPortCountry: {
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

module.exports = seaPort;
