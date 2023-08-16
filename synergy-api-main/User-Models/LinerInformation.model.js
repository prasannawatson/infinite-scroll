const Sequelize = require("sequelize");
const sequelize = require("../db");

const LinerInformation = sequelize.define("sc_liner_informations", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  bookingIdFk: {
    type: Sequelize.INTEGER, //Booking ID Foreign Key
    allowNull: false,
  },
  linerName: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  carrierBookingNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  vesselName: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  voyageNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  serviceContract: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  freightTerms: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  movementType: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  ETA: {
    type: Sequelize.DATEONLY, // Estimated  Time Of Arrival
    allowNull: true,
  },
  ETD: {
    type: Sequelize.DATEONLY, // Estimated  Time Of Delivery
    allowNull: true,
  },
  linerCutOff: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  vgmCutOff: {
    type: Sequelize.DATEONLY, //Verified gross mass Cutoff
    allowNull: true,
  },
  portCutOff: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  docsCutOff: {
    type: Sequelize.DATEONLY, //Documents CutOff
    allowNull: true,
  },
  amsCutOff: {
    type: Sequelize.DATEONLY, //Automated manifest System Cutoff
    allowNull: true,
  },
  status: {
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

module.exports = LinerInformation;
