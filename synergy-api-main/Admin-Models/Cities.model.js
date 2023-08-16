const Sequelize = require("sequelize");
const sequelize = require("../db");

const City = sequelize.define("sc_cities", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  cityName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  stateId: {
    type: Sequelize.INTEGER, //Foreign Key from State Table
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

module.exports = City;
