const Sequelize = require("sequelize");
const sequelize = require("../db");

const LCLQuotationCharges = sequelize.define("sc_land_quotation_charges", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  quotationId: {
    type: Sequelize.INTEGER,
  },
  landChargeCode: {
    type: Sequelize.INTEGER,
  },
  landChargeName: {
    type: Sequelize.STRING,
  },
  landChargeType: {
    type: Sequelize.STRING,
  },
  landCurrency: {
    type: Sequelize.INTEGER,
  },
  landUOM: {
    type: Sequelize.INTEGER, //Land Unit Of Measurement
  },
  landMinBuyAmnt: {
    type: Sequelize.FLOAT, // Land Minimum Buy Amount
  },
  buyAmntPrUnit: {
    type: Sequelize.FLOAT, // Buy Amount Per Unit
  },
  landMinSellAmnt: {
    type: Sequelize.FLOAT, //Land Minimum Sell Amount
  },
  sellAmntPrUnit: {
    type: Sequelize.FLOAT, // Sell Amount Per Unit
  },
  totBuy: {
    type: Sequelize.FLOAT, //Total Buy
  },
  totSell: {
    type: Sequelize.FLOAT, //Total Sell
  },
  grossProfit: {
    type: Sequelize.FLOAT,
  },
  profitPercentage: {
    type: Sequelize.FLOAT,
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

module.exports = LCLQuotationCharges;
