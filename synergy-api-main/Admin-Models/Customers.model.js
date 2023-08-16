const Sequelize = require("sequelize");
const sequelize = require("../db");

const Customers = sequelize.define("sc_customers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  customerBranchId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  customerName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  customerCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  customerCountryIdFk: {
    type: Sequelize.INTEGER, //Customer Country Id Foreign key
    allowNull: false,
  },
  customerStatus: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  // custGlobalCompanyId: {
  //   type:Sequelize.INTEGER,
  //   allowNull:false
  // },
  // custCompanyCountryId: {
  //   type:Sequelize.INTEGER,
  //   allowNull:false
  // },
  // custCompanyBranchId :{
  //   type:Sequelize.INTEGER,
  //   allowNull:false
  // },
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

module.exports = Customers;
