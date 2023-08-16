const Sequelize = require("sequelize");
const sequelize = require("../db");

const States = sequelize.define("sc_states", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  stateName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  countryId: {
    type: Sequelize.INTEGER, //Foreign Key from Country Table
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

module.exports = States;
