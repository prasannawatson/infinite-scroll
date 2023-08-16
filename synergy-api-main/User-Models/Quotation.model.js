const Sequelize = require("sequelize");
const sequelize = require("../db");

const Quotation = sequelize.define("sc_quotations", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  qoutationNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  customerNameIdFk: {
    type: Sequelize.INTEGER, //Customer Name Id Foreign key
    allowNull: false,
  },
  routedBy: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  approvedEmployeeIdFk: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  salesPersonIdFk: {
    type: Sequelize.INTEGER, //Sales Person ID Foreign Key
    allowNull: true,
  },
  freights: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  placeOfLoadingId:{
    type: Sequelize.INTEGER, 
    allowNull: true,
  },
  portOfLoadingId:{
    type: Sequelize.INTEGER, 
    allowNull: false,
  },
  portOfDischargeId:{
    type: Sequelize.INTEGER, 
    allowNull: false,
  },
  placeOfDeliveryId:{
    type: Sequelize.INTEGER, 
    allowNull: true,
  },
  categoryId:{
    type: Sequelize.INTEGER, 
    allowNull: false,
  },
  termsId:{
    type: Sequelize.INTEGER, 
    allowNull: false,
  },
  PPCC:{
    type: Sequelize.STRING, 
    allowNull: true,
  },
  validFrom: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  validTill: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  followUpDate: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  freightStatus: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  globalCompanyId:{
    type: Sequelize.INTEGER,
    allowNull : false
  },
  branchCountryId:{
    type: Sequelize.INTEGER,
    allowNull : false
  },
  branchNameId:{
    type: Sequelize.INTEGER,
    allowNull: false
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

module.exports = Quotation;
