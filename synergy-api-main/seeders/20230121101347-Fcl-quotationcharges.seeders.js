"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_fcl_quotation_charges", [
      {
        id: 1,
        quotationId: 1,
        fclChargeCode: 1,
        fclChargeName: "UHDSUH",
        fclChargeType: "DDSSFF",
        fclCurrency: 454,
        fclUOM: 3245,
        fclMinBuyAmnt: 250000,
        buyAmntPrUnit: 55000,
        fclMinSellAmnt: 40000,
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
    return queryInterface.bulkDelete("sc_fcl_quotation_charges", null, {});
  },
};
