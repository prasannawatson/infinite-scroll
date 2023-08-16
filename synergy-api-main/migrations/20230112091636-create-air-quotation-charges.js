"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sc_air_quotation_charges", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quotationId: {
        type: Sequelize.INTEGER,
      },
      afChargeCode: {
        type: Sequelize.INTEGER, //Air-Freight charge Code
      },
      afChargeName: {
        type: Sequelize.STRING, //Air-Freight Charge Name
      },
      afChargeType: {
        type: Sequelize.STRING, //Air-Freight Charge Type
      },
      afCurrency: {
        type: Sequelize.INTEGER, //Air-Freight Currency
      },
      afUOM: {
        type: Sequelize.INTEGER, //Air-Freight Unit of Measurement
      },
      afMinBuyAmnt: {
        type: Sequelize.FLOAT, //Air-Freight  Minimum Buy Amount
      },
      buyAmntPrUnit: {
        type: Sequelize.FLOAT, // Buy Amount Per Unit
      },
      afMinSellAmnt: {
        type: Sequelize.FLOAT, //Air-Freight Minimum Sell Amount
      },
      sellAmntPrUnit: {
        type: Sequelize.FLOAT, //Sell Amount Per Unit
      },
      totBuy: {
        type: Sequelize.FLOAT, // Total Buy
      },
      totSell: {
        type: Sequelize.FLOAT, // Total Sell
      },
      grossProfit: {
        type: Sequelize.FLOAT,
      },
      profitPercentage: {
        type: Sequelize.FLOAT,
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sc_air_quotation_charges");
  },
};
