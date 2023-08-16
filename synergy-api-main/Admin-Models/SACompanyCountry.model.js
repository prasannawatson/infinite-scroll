const Sequelize = require("sequelize");
const sequelize = require("../db");

const companyCountry = sequelize.define("sa_country_companies", {//SuperAdmin Country Companies
    //SA (or) sa is Super-Admin
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  saCompanyName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  saCompanyWebsite: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  saCompanyLogo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  saCompanyAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  saCountryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  saStateId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  saCityId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  saCompanyZip: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  saFirstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  saLastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  saPrimaryEmail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  saAlternateEmail: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  saPrimaryNumber: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  saAlternateNumber: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  saCompanyTax: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  saPrimaryCurrency: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  paSaGlobalCompanyId : {
    type: Sequelize.INTEGER,
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

module.exports = companyCountry;
