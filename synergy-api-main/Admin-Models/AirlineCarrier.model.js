const Sequelize = require("sequelize");
const sequelize = require("../db");

const airLineCarrier = sequelize.define("sc_airline_carriers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  airLineName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  iataDesignator: {
    type: Sequelize.STRING, //International Air Transport Association Designator
    allowNull: true,
  },
  digitCode: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  icaoCode: {
    type: Sequelize.STRING, //International Civil Aviation Organization Code
    allowNull: false,
  },
  airLineCountry: {
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

module.exports = airLineCarrier;
