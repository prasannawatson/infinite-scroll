const Sequelize = require("sequelize");
const sequelize = require("../db");

const branchAssigning = sequelize.define("sc_branch_assignings", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  branchCountryId: {
    type: Sequelize.INTEGER, 
    allowNull: false,
  },
  branchNameId: {
    type: Sequelize.INTEGER, //branch id from sa_company_branches table
    allowNull: false,
  },
  companyCountryId:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  employeeRole: {
    type: Sequelize.STRING, //Admin / User
    allowNull: false,
  },
  defaultBranch: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  employeeId: {
    type: Sequelize.INTEGER, //employee ID from sc_employees table
    allowNull: false,
  },
  creatorRole: {
    type: Sequelize.STRING, //suoer-admin / admin based on the user who assigned the branch to Admin / User
    allowNull: true,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  createdById: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  modifiedById: {
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

module.exports = branchAssigning;
