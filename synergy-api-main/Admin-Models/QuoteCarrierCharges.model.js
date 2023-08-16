const Sequelize = require("sequelize");
const sequelize = require("../db");

const quoteCarrierCharges = sequelize.define("sc_quote_carrier_charges", {
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
  quoteCarrierId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  chargeCodeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  currencyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  uomId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  minBuyAmnt: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  buyAmntPrUnit: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  sellAmntPrUnit: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  minSellAmnt: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  totBuy: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  totSell: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  grossProfit: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  PPCC:{
    type:Sequelize.STRING,
    allowNull:true,
  },
  rcvblPartyId:{
    type:Sequelize.INTEGER,
    allowNull:true,
  },
  pyblPartyId:{
    type:Sequelize.INTEGER,
    allowNull:true,
  },
  status:{
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  modifiedBy: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
})

module.exports = quoteCarrierCharges;