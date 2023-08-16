"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_lcl_quotation_charges", [
      {
        id: 1,
        quotationId: 1,
        lclChargeCode: 1,
        lclChargeName: "UHDSUH",
        lclChargeType: "DDSSFF",
        lclCurrency: 454,
        lclUOM: 3245,
        lclMinBuyAmnt: 250000,
        buyAmntPrUnit: 55000,
        lclMinSellAmnt: 40000,
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
    return queryInterface.bulkDelete("sc_lcl_quotation_charges", null, {});
  },
};
