const Sequelize = require("sequelize");
const sequelize = require("../db");

const carrierType = sequelize.define("sc_carrier_types", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    carrierTypeName: {
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

module.exports = carrierType;