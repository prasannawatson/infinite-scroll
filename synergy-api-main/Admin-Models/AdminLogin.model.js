const Sequelize = require("sequelize");
const sequelize = require("../db");

const adminLogin = sequelize.define("admin_logins", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  branchAdminFirstName: {
    type: Sequelize.STRING, 
    allowNull: false,
  },
  branchAdminLastName: {
    type: Sequelize.STRING, 
    allowNull: false,
  },
  branchAdminUserName: {
    type: Sequelize.STRING, 
    allowNull: true,
  },
  branchAdminEmail: {
    type: Sequelize.STRING, 
    allowNull: false,
  },
  branchAdminPhone: {
    type: Sequelize.BIGINT, 
    allowNull: false,
  },
  branchAdminPassword: {
    type: Sequelize.TEXT, 
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING, 
    allowNull: false,
  },
  role:{
    type:Sequelize.TEXT,
    allowNull:false
  },
  createdSAId:{
    type:Sequelize.INTEGER, //Super-Admin ID from sa_login table
    allowNull:false,
  },
  modifiedSAId: {
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

module.exports = adminLogin;
