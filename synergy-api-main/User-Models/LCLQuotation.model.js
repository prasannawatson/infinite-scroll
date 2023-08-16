const Sequelize = require("sequelize");
const sequelize = require("../db");

const LCLQuote = sequelize.define("sc_lcl_quotations", {
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
  lclPlaceOfRecieptFk: {
    allowNull: false, //Lcl-Place Of Reciept Foreign key
    type: Sequelize.INTEGER,
  },
  lclPortOfLoadingFk: {
    allowNull: false, //Lcl-Port Of Loading Foreign key
    type: Sequelize.INTEGER,
  },
  lclPortOfDeliveryFk: {
    allowNull: false, //Lcl-Port Of Delivery Foreign key
    type: Sequelize.INTEGER,
  },
  lclPlaceOfDeliveryFk: {
    allowNull: false, //Lcl-Place Of Delivery Foreign key
    type: Sequelize.INTEGER,
  },
  lclTermsFk: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  PPCC: {
    allowNull: false, //prepaid & Collect
    type: Sequelize.STRING,
  },
  lclCarrierFk: {
    allowNull: false, //Lcl Carrier Foreign key
    type: Sequelize.INTEGER,
  },
  drtTrnst: {
    allowNull: false, // Direct & Transit
    type: Sequelize.STRING,
  },
  lclTransitPortFk: {
    allowNull: false, //Lcl Transit Port Foreign key
    type: Sequelize.INTEGER,
  },
  transitTime: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  frequency: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  validFrom: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  validTill: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  lclExportMovement: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  noOfPackages: {
    allowNull: false,
    type: Sequelize.INTEGER, //Number Of Packages
  },
  weightKgs: {
    allowNull: false,
    type: Sequelize.FLOAT, //Weight in Kilograms
  },
  weightLbs: {
    allowNull: false, //Weight in Pounds
    type: Sequelize.FLOAT,
  },
  uomWeight: {
    allowNull: false, // Unit of Measurement Weight
    type: Sequelize.INTEGER,
  },
  lengthCm: {
    allowNull: false, //Length  in Centimeter
    type: Sequelize.FLOAT,
  },
  lengthInches: {
    allowNull: false,
    type: Sequelize.FLOAT,
  },
  widthCm: {
    allowNull: false,
    type: Sequelize.FLOAT,
  },
  widthInches: {
    allowNull: false, //Width in Centimeter
    type: Sequelize.FLOAT,
  },
  heightCm: {
    allowNull: false, //Height in Centimeter
    type: Sequelize.FLOAT,
  },
  heightInches: {
    allowNull: false,
    type: Sequelize.FLOAT,
  },
  uomMeasurment: {
    allowNull: false, //Unit Of Measurment
    type: Sequelize.INTEGER,
  },
  volume: {
    allowNull: false,
    type: Sequelize.FLOAT,
  },
  uomVolume: {
    allowNull: false, //Unit Of Measurement
    type: Sequelize.INTEGER,
  },
  chargeableKgs: {
    allowNull: false, //Chargeable in Kilograms
    type: Sequelize.FLOAT,
  },
  chargeableLbs: {
    allowNull: false, //Chargeable  in Pounds
    type: Sequelize.FLOAT,
  },
  uomChargeable: {
    allowNull: false, // Unit Of Measurement Chargrable
    type: Sequelize.INTEGER,
  },
  lclHazardous: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  lclHtsCode: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  lclPickupAddress: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  lclDeliveryAddress: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  lclCommodity: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  lclConsignor: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  lclConsignee: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  lclControllingParty: {
    allowNull: false,
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
  lclFreightStatus: {
    allowNull: false,
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

module.exports = LCLQuote;
