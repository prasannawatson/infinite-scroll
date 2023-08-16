const Sequelize = require("sequelize");
const sequelize = require("../db");

const customerDetails = sequelize.define("sc_customer_details", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  customerIdFk: {
    type: Sequelize.INTEGER, // Customer Id Foreign key
    allowNull: false,
  },
  customerBranchId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  customerCompanyAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  customerState: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  customerCity: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  customerZip: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  customerEmail: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  customerPhone: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  customerFax: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  customerNetwork: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  customerStatus: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  customerLogId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  customerRegDate: {
    type: Sequelize.DATEONLY,
    allowNull: true,
    defaultValue: Sequelize.NOW,
  },
  shipmentParty: {
    type: Sequelize.JSONB,
    allowNull: true,
  },
  vendorParty: {
    type: Sequelize.JSONB,
    allowNull: true,
  },
  customerType: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  customerBankStatus: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  custGlobalCompanyId: {
      type:Sequelize.INTEGER,
      allowNull:false
    },
    custCompanyCountryId: {
      type:Sequelize.INTEGER,
      allowNull:false
    },
    custCompanyBranchId :{
      type:Sequelize.INTEGER,
      allowNull:false
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

module.exports = customerDetails;
