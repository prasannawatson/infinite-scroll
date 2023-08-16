const Sequelize = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  employeeId:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mobile: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  roles: {
    type: Sequelize.JSONB,
    allowNull: false,
  },
  userRole:{
    type: Sequelize.STRING,
    allowNull:false
  },
  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  paSaGlobalCompanyId:{
    type: Sequelize.INTEGER,
    allowNull : false
  },
  saCountryCompanyId:{
    type: Sequelize.INTEGER,
    allowNull : false
  },
  saBranchId:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  creatorRole:{
    type: Sequelize.STRING,
    allowNull: false
  },
  createdBy:{
    type:Sequelize.INTEGER,
    allowNull: false,
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

module.exports = User;
