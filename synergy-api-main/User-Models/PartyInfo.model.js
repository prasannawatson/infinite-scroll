const Sequelize = require("sequelize");
const sequelize = require("../db");

const PartyInfo = sequelize.define("sc_fcl_partyinfos", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  bookingIdFk: {
    type: Sequelize.INTEGER, //Booking ID Foreign Key
    allowNull: false,
  },
  prepaidName: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  prepaidAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  collectName: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  collectAddress: {
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

module.exports = PartyInfo;
