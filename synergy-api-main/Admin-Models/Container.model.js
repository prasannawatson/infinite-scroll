const Sequelize = require("sequelize");
const sequelize = require("../db");

const unitOfMeasurment = sequelize.define("sc_containers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  containerName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  maxKG: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  maxCBM: {
    type: Sequelize.FLOAT,
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

module.exports = unitOfMeasurment;
