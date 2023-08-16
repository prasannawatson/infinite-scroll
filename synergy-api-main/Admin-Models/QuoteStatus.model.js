const Sequelize = require("sequelize");
const sequelize = require("../db");

const quoteStatus = sequelize.define("sc_quote_status", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    statusType: {
        type: Sequelize.STRING,
        allowNull: false,
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

module.exports = quoteStatus;