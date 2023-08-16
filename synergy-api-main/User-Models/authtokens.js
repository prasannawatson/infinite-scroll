const Sequelize = require("sequelize");
const sequelize = require("../db");

const authTokens = sequelize.define("auth_tokens", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  userId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  token: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  userEmail: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  expireTime: {
    allowNull: false,
    type: Sequelize.DATE,
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

module.exports = authTokens;
