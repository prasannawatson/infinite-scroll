"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_air_quotation_charges", [
      {
        id: 1,
        quotationId: 1,
        afChargeCode: 1,
        afChargeName: "UHDSUH",
        afChargeType: "DDSSFF",
        afCurrency: 454,
        afUOM: 3245,
        afMinBuyAmnt: 250000,
        buyAmntPrUnit: 55000,
        afMinSellAmnt: 40000,
        sellAmntPrUnit: 53535,
        totBuy: 45760,
        totSell: 22222,
        grossProfit: 55555,
        profitPercentage: 80,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_air_quotation_charges", null, {});
  },
};
