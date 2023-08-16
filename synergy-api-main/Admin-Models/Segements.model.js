const Sequelize = require("sequelize");
const sequelize = require("../db");

const Segments = sequelize.define("pa_segments", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  segmentCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  segmentName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  segmentType: {
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

module.exports = Segments;
