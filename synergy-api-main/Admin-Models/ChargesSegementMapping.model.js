const Sequelize = require("sequelize");
const sequelize = require("../db");

const chargesMapping = sequelize.define("sc_charges_segment_mappings", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    segmentId: {
      type: Sequelize.INTEGER, //segment Id from pa_segements table, 
      allowNull: false,
    },
    airLineId: {
      type: Sequelize.INTEGER, //Airline Id from sc_airline_carriers table, 
      allowNull: false,
    },
    cargoTypeId: {
      type: Sequelize.INTEGER, //Cargo Id from sc_cargo_categories table, 
      allowNull: false,
    },
    chargeTypeId: {
      type: Sequelize.INTEGER, //charge type Id from sc_charge_types1 table, 
      allowNull: false,
    },
    chargeCodeId: {
      type: Sequelize.INTEGER, //charge code id from sc_charges table
      allowNull: false,
    },
    incoTermId: {
      type: Sequelize.INTEGER, //inco term id from sc_incoterms table
      allowNull: true,
    },
    movementTypeId: {
      type: Sequelize.INTEGER, //movementTypeId from pa_movement_type table
      allowNull: false,
    },
    currencyId: {
      type: Sequelize.INTEGER, //currency id from sc_currencies table
      allowNull: false,
    },
    uomId: {
      type: Sequelize.INTEGER, //uom id from sc_uoms table
      allowNull: false,
    },
    placeOfRecieptId: {
      type: Sequelize.INTEGER, //Place of reciept Id from sc_seaports
      allowNull: true,
    },
    portOfLoadingId: {
      type: Sequelize.INTEGER, //Port of loading Id from sc_seaports
      allowNull: true,
    },
    portOfDischargeId: {
      type: Sequelize.INTEGER, //port of discharge Id from sc_seaports
      allowNull: true,
    },
    placeOfDeliveryId: {
      type: Sequelize.INTEGER, //Place of delivery Id from sc_seaports
      allowNull: true,
    },
    minBuyAmnt: {
      type: Sequelize.FLOAT, 
      allowNull: true,
    },
    buyAmntPrUnit: {
      type: Sequelize.FLOAT, 
      allowNull: true,
    },
    minSellAmnt: {
      type: Sequelize.FLOAT, 
      allowNull: true,
    },
    sellAmntPrUnit: {
      type: Sequelize.FLOAT, 
      allowNull: true,
    },
    validTill: {
      type: Sequelize.DATEONLY, 
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    globalCompanyId:{
      type: Sequelize.INTEGER, //company Id from pa_global_companies table
      allowNull : false
    },
    branchCountryId:{
      type: Sequelize.INTEGER, //country company Id from pa_global_companies table
      allowNull : false
    },
    branchNameId:{
      type: Sequelize.INTEGER,//branch name Id from pa_global_companies table
      allowNull: false
    },
    createdBy: {
      type: Sequelize.INTEGER,//employeeId from users table
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
