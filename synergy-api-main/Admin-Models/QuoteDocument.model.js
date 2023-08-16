const Sequelize = require("sequelize");
const sequelize = require("../db");

const quoteDocument = sequelize.define("sc_quote_documents", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quoteId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    documentCategory: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    documentName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    uploadFileName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN,
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

module.exports = quoteDocument;