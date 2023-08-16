const Sequelize = require("sequelize");
const sequelize = require("../db");

const superAdmin = sequelize.define("sa_logins", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  paSaFirstName: {
    type: Sequelize.STRING, //Power-Admin Super-Admin First Name
    allowNull: false,
  },
  paSaLastName: {
    type: Sequelize.STRING, //Power-Admin Super-Admin Last Name
    allowNull: false,
  },
  paSaUserName: {
    type: Sequelize.STRING, //Power-Admin Super-Admin user Name
    allowNull: true,
  },
  paSaEmail: {
    type: Sequelize.STRING, //Power-Admin Super-Admin Email-Id
    allowNull: false,
  },
  paSaContactNumber: {
    type: Sequelize.BIGINT, //Power-Admin Super-Admin Contact Number
    allowNull: false,
  },
  paSaPassword: {
    type: Sequelize.TEXT, //Power-Admin Super-Admin Password
    allowNull: false,
  },
  paSaStatus: {
    type: Sequelize.STRING, //Power-Admin Super-Admin status
    allowNull: false,
  },
  role:{
    type:Sequelize.TEXT,
    allowNull:false
  },
  paSaCompanyId:{
  type:Sequelize.INTEGER,//Power-Admin Super-Admin company primary id from pa_global_companies table
  allowNull:false,
  },
  paSaCreatedLoginId:{
    type:Sequelize.INTEGER,//Power-Admin primary id from pa_logins tables, who created super admin
    allowNull:false,
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

module.exports = superAdmin;
