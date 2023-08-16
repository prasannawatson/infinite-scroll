const Sequelize = require("sequelize");
const sequelize = require("../db");

const Currency = sequelize.define("sc_currencies", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  currencyCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  currencyROE: {
    type: Sequelize.INTEGER, //currency Rate of Exchange
    allowNull: false,
  },
  currencyValidity: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  currencyStatus: {
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

module.exports = Currency;
