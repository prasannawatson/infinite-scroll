const Sequelize = require("sequelize");
const sequelize = require("../db");

const chargesMapping = sequelize.define("sc_charges_mappings", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  chargeNameFk: {
    type: Sequelize.INTEGER, //charge name foreign key
    allowNull: false,
  },
  chargeContainerIdFk: {
    type: Sequelize.INTEGER, //charge Container Id Foreign key
    allowNull: true,
  },
  chargeCategoryFk: {
    type: Sequelize.STRING, //charge category foreign key
    allowNull: false,
  },
  chargeUOMFk: {
    type: Sequelize.INTEGER, //charge Unit of Measurement foreign key
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

module.exports = chargesMapping;
