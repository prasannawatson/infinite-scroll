const Sequelize = require("sequelize");
const sequelize = require("../db");

const cargoCategory = sequelize.define("sc_cargo_categories", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  cargoTypeName: {
    type: Sequelize.STRING, 
    allowNull: false,
  },
  cargoTypeDescription: {
    type: Sequelize.STRING, 
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

module.exports = cargoCategory;
