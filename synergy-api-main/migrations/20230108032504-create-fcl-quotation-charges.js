"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sc_fcl_quotation_charges", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quotationId: {
        type: Sequelize.INTEGER,
      },
      fclChargeCode: {
        type: Sequelize.INTEGER,
      },
      fclChargeName: {
        type: Sequelize.STRING,
      },
      fclChargeType: {
        type: Sequelize.STRING,
      },
      fclCurrency: {
        type: Sequelize.INTEGER,
      },
      fclUOM: {
        type: Sequelize.INTEGER, // fcl-Unit of Measurement
      },
      fclMinBuyAmnt: {
        type: Sequelize.FLOAT, // fcl-Minimum Buy Amount
      },
      buyAmntPrUnit: {
        type: Sequelize.FLOAT, //Buy Amount Per Unit
      },
      fclMinSellAmnt: {
        type: Sequelize.FLOAT, //fcl-Minimum Sell Amount
      },
      sellAmntPrUnit: {
        type: Sequelize.FLOAT, // Sell Amount Per Unit
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
    await queryInterface.dropTable("sc_fcl_quotation_charges");
  },
};
