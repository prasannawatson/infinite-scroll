const Sequelize = require("sequelize");
const sequelize = require("../db");

const fclJobDetails = sequelize.define("sc_fcl_job_details", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  fclJobNum: {
    type: Sequelize.STRING(15), //fcl-Job Number
    allowNull: false,
  },
  fclExpBookingId: {
    type: Sequelize.STRING(11), // fcl-Export Booking Id
    allowNull: false,
  },
  fclJobDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  fclJobMbl: {
    type: Sequelize.STRING(15), // fcl-Job Master Bill
    allowNull: true,
  },
  fclJobMblDate: {
    type: Sequelize.DATE, // FCl-Job Master bill Date
    allowNull: true,
  },
  fclJobAgent: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  fclJobAgentAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fclJobBlType: {
    type: Sequelize.STRING(15), //fcl-Job Bill Type
    allowNull: true,
  },
  fclJobFt: {
    type: Sequelize.STRING(15), //fcl-Job frieght Terms
    allowNull: true,
  },
  fclJobDm: {
    type: Sequelize.STRING(1), //Fcl- Job Direct Master
    allowNull: true,
  },
  fclJobPor: {
    type: Sequelize.INTEGER(11), //fcl-Job Place of Receipt
    allowNull: false,
  },
  fclJobPol: {
    type: Sequelize.INTEGER(11), //fcl-Job Port of loading
    allowNull: false,
  },
  fclJobPodischarge: {
    type: Sequelize.INTEGER(11), //fcl-Job Port of Discharge
    allowNull: false,
  },
  fclJobPod: {
    type: Sequelize.INTEGER(11), //fcl-Job Port of Delivery
    allowNull: false,
  },
  fclJobEtd: {
    type: Sequelize.DATE, // fcl-Job Estimated Time of Delivery
    allowNull: false,
  },
  fclJobEta: {
    type: Sequelize.DATE, // fcl-Job Estimated Time of Arrival
    allowNull: false,
  },
  fclJobAtd: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  fclJobAta: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  fclJobCarrier: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  fclJobVessel: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  fclJobVoyage: {
    type: Sequelize.STRING(15),
    allowNull: false,
  },
  fclJobMove: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  fclJobNotes: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  fclJobStatus: {
    type: Sequelize.STRING,
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

module.exports = fclJobDetails;
