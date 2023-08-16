const Sequelize = require("sequelize");
const sequelize = require("../db");

const Carrier = sequelize.define("sc_air_quote_notes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quoteId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  notes: {
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

module.exports = Carrier;
