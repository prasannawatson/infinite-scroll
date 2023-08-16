const Sequelize = require("sequelize");
const sequelize = require("../db");

const LCLQuotationCharges = sequelize.define("sc_lcl_quotation_charges", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  quotationId: {
    type: Sequelize.INTEGER,
  },
  lclChargeCode: {
    type: Sequelize.INTEGER,
  },
  lclChargeName: {
    type: Sequelize.STRING,
  },
  lclChargeType: {
    type: Sequelize.STRING,
  },
  lclCurrency: {
    type: Sequelize.INTEGER,
  },
  lclUOM: {
    type: Sequelize.INTEGER, //Lcl Unit Of Measurement
  },
  lclMinBuyAmnt: {
    type: Sequelize.FLOAT, // Lcl Minimum Buy Amount
  },
  buyAmntPrUnit: {
    type: Sequelize.FLOAT, // Buy Amount Per Unit
  },
  lclMinSellAmnt: {
    type: Sequelize.FLOAT, //Lcl Minimum Sell Amount
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
