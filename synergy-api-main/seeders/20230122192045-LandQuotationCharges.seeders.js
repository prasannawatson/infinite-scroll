"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_land_quotation_charges", [
      {
        id: 1,
        quotationId: 1,
        landChargeCode: 1,
        landChargeName: "UHDSUH",
        landChargeType: "DDSSFF",
        landCurrency: 454,
        landUOM: 3245,
        landMinBuyAmnt: 250000,
        buyAmntPrUnit: 55000,
        landMinSellAmnt: 40000,
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
    return queryInterface.bulkDelete("sc_land_quotation_charges", null, {});
  },
};
