const Sequelize = require("sequelize");
const sequelize = require("../db");

const unitOfMeasurment = sequelize.define("sc_uoms", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  uomName: {
    type: Sequelize.STRING, //Unit Of Measurment Name
    allowNull: false,
  },
  uomStatus: {
    type: Sequelize.BOOLEAN, //Unit Of Measurment Status
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
