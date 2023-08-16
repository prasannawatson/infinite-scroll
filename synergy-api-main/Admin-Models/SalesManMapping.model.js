const Sequelize = require("sequelize");
const sequelize = require("../db");

const SalesManMapping = sequelize.define("sc_salesman_mappings", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  companyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  employeeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  segments: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  priority: {
    type: Sequelize.STRING,
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

module.exports = SalesManMapping;
