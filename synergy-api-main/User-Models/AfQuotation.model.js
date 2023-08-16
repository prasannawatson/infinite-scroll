const Sequelize = require("sequelize");
const sequelize = require("../db");

const AirFreightQuote = sequelize.define("sc_air_quotations", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  quotationId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  afPlaceOfRecieptFk: {
    allowNull: false, //Air Freight Place of Reciept Foreign Key
    type: Sequelize.INTEGER
  },
  afPortOfLoadingFk: {
    allowNull: false, //Air Freight Port of Loading Foreign Key
    type: Sequelize.INTEGER,
  },
  afPortOfDeliveryFk: {
    allowNull: false, //Air Freight Port of Delivery Foreign Key
    type: Sequelize.INTEGER,
  },
  afPlaceOfDeliveryFk: {
    allowNull: false, //Air Freight Place of Delivery Foreign Key
    type: Sequelize.INTEGER,
  },
  afTermsFk: {
    allowNull: false, //Air Freight Terms Foreign Key
    type: Sequelize.INTEGER,
  },
  PPCC: {
    allowNull: false, //prepaid collect
    type: Sequelize.STRING,
  },
  afExportMovement: {
    allowNull: false, // Air-Freight Export Movement
    type: Sequelize.INTEGER
  },
  afPickupAddress: {
    allowNull: false, //Air Freight  Pickup Address
    type: Sequelize.STRING,
  },
  afDeliveryAddress: {
    allowNull: false, //Air Freight  Delivery Address
    type: Sequelize.STRING,
  },
  afCommodity: {
    allowNull: false, //Air Freight  Commodity
    type: Sequelize.STRING,
  },
  afConsignor: {
    allowNull: false, //Air Freight  Consignor
    type: Sequelize.INTEGER,
  },
  afConsignee: {
    allowNull: false, //Air Freight  Consignee
    type: Sequelize.INTEGER,
  },
  afControllingParty: {
    allowNull: false, //Air Freight Controllin Party
    type: Sequelize.INTEGER,
  },
  insuranceValue: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  cargoValue: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  afFreightStatus: {
    allowNull: false, //Air Freight Status
    type: Sequelize.STRING,
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

module.exports = AirFreightQuote;
