const Sequelize = require("sequelize");
const sequelize = require("../db");

const employee = sequelize.define("sc_employees", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  empCode: {
    type: Sequelize.STRING, //Employee Code
    allowNull: true,
  },
  empDeptId: {
    type: Sequelize.BIGINT, //Employee Department ID
    allowNull: true,
    comment: "Employee department ID",
  },
  empDesigId: {
    type: Sequelize.INTEGER, //Employee Designation ID
    allowNull: false,
    comment: "Employee Designation ID",
  },
  empDob: {
    type: Sequelize.DATEONLY, // Employee Date of Birth
    allowNull: true,
  },
  empEmail: {
    type: Sequelize.STRING, // Employee Email
    allowNull: false,
  },
  empFirstName: {
    type: Sequelize.STRING, //Employee First Name
    allowNull: false,
  },
  empGender: {
    type: Sequelize.STRING, // Employee Gender
    allowNull: true,
  },
  empIdKey: {
    type: Sequelize.INTEGER, //Employee ID key
    allowNull: true,
  },
  empLastName: {
    type: Sequelize.STRING, //Employee Last Name
    allowNull: false,
  },
  empPhone: {
    type: Sequelize.BIGINT, //Employee Phone
    allowNull: false,
  },
  empSales: {
    type: Sequelize.STRING, //Employee Sales
    allowNull: false,
  },
  empType:{
    type: Sequelize.STRING,
    allowNull: false
  },
  employeeRole:{
    type: Sequelize.INTEGER,
    allowNull:true
  },
  password:{
    type: Sequelize.TEXT,
    allowNull: true
  },
  paSaGlobalCompanyId:{
    type: Sequelize.INTEGER,
    allowNull : false
  },
  empBranchCountryId:{
    type: Sequelize.INTEGER,
    allowNull : false
  },
  empBranchNameId:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  empStatus: {
    type: Sequelize.STRING, //Employee Status
    allowNull: false,
  },
  creatorRole:{
    type: Sequelize.STRING,
    allowNull: false
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
});

module.exports = employee;
