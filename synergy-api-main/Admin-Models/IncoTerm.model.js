const Sequelize = require("sequelize");
const sequelize = require("../db");

const incoTerm = sequelize.define("sc_incoterms", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  incoTermName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  incoTermDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  incoTermFreightTerm: {
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

module.exports = incoTerm;
