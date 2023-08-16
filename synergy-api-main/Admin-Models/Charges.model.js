const Sequelize = require("sequelize");
const sequelize = require("../db");

const Charges = sequelize.define("sc_charges", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  chargesCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  chargesName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  chargeTypeId: {
    type: Sequelize.INTEGER, // Charges type  id from sc_charge_types
    allowNull: false,
  },
  carrierTypeId: {
    type: Sequelize.INTEGER, // Charges type  id from sc_carrier_types
    allowNull: false,
  },
  chargesMCurId: {
    type: Sequelize.INTEGER, // Currency  id from sc_currencies
    allowNull: false,
  },
  uomId: {
    type: Sequelize.INTEGER, // Charges type  id from sc_uoms
    allowNull: false,
  },
  containerTypeId: {
    type: Sequelize.INTEGER, // Charges type  id from sc_containers
    allowNull: true,
  },
  chargesStatus: {
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

module.exports = Charges;
