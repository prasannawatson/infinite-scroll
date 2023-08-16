const Sequelize = require("sequelize");
const sequelize = require("../db");

const fclJobAttachment = sequelize.define("sc_fcl_job_attachments", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  fclJobDetailsId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  fclJobBookingId: {
    type: Sequelize.INTEGER,
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

module.exports = fclJobAttachment;
