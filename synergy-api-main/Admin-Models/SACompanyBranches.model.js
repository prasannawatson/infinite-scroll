const Sequelize = require("sequelize");
const sequelize = require("../db");

const companyBranch = sequelize.define("sa_company_branches", {//Company Branches based on Country
    //SA (or) sa is Super-Admin
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  saBranchName:{
    type:Sequelize.STRING,
    allowNull:false,
  },
  saBranchAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  saBranchCountryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  saBranchStateId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  saBranchCityId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  saBranchZip: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  saBranchFirstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  saBranchLastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  saBranchPrimEmail: {
    type: Sequelize.STRING, //super admin branch primary email
    allowNull: false,
  },
  saBranchAltEmail: {
    type: Sequelize.STRING, //super admin branch alternate email
    allowNull: true,
  },
  saBranchPrimNum: {
    type: Sequelize.BIGINT,//super admin branch primary number
    allowNull: false,
  },
  saBranchAltNum: {
    type: Sequelize.BIGINT,//super admin branch alternate number
    allowNull: true,
  },
  saBranchSecCurrency: {
    type: Sequelize.INTEGER, //super admin branch secondary currency
    allowNull: true,
  },
  paSaGlobalCompanyId:{
    type: Sequelize.INTEGER, //power admin global company ID from (pa_global_companies)
    allowNull:false,
  },
  saCompanyCountryId: {
    type: Sequelize.INTEGER, //super admin company country Id
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  createdSAId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  modifiedSAId: {
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

module.exports = companyBranch;
