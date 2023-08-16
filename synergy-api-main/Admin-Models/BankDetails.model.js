const Sequelize = require("sequelize");
const sequelize = require("../db");

const BankInfo = sequelize.define("sc_bank_infos", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  bankCustomerIdFk: {
    type: Sequelize.INTEGER, //bank Customer Id Foreign key
    allowNull: false,
  },
  bankCustomerDetailsIdFk: {
    type: Sequelize.INTEGER, //bank Customer Details Id Foreign key
    allowNull: false,
  },
  bankCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bankBranch: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bankName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bankAddress: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  bankAccNameCheque: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  bankAccNameFull: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  bankAccNumber: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  bankAccType: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  bankCurrency: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  bankSwiftCode: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  bankIfscCode: {
    type: Sequelize.STRING, //bank IFSC code
    allowNull: true,
  },
  bankIbanCode: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  bankControlDigitCode: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  bankStatus: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
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

module.exports = BankInfo;
