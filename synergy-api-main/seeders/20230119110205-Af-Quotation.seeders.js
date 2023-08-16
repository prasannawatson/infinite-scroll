"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_air_quotations", [
      {
        id: 1,
        quotationId: 1,
        afPlaceOfRecieptFk: 1,
        afPortOfLoadingFk: 1,
        afPortOfDeliveryFk: 1,
        afPlaceOfDeliveryFk: 1,
        afTermsFk: 1,
        PPCC: "prepaid",
        afCarrierFk: 1,
        drtTrnst: "direct",
        afTransitPortFk: 1,
        transitTime: 1,
        frequency: 1,
        validFrom: new Date(),
        validTill: new Date(),
        afExportMovement: "afExportMovement",
        noOfPackages: 1,
        weightKgs: 0.23,
        weightLbs: 0.23,
        uomWeight: 1,
        lengthCm: 5.1,
        lengthInches: 5.1,
        widthCm: 10.2,
        widthInches: 10.2,
        heightCm: 10.5,
        heightInches: 10.5,
        uomMeasurment: 10,
        volume: 123.098,
        uomVolume: 213,
        chargeableKgs: 323.2331,
        chargeableLbs: 123.232,
        uomChargeable: 231,
        afHazardous: "afHazardous",
        afHtsCode: "afHtsCode",
        afPickupAddress: "afPickupAddress",
        afDeliveryAddress: "afDeliveryAddress",
        afCommodity: "afCommodity",
        afConsignor: 1,
        afConsignee: 1,
        afControllingParty: 1,
        insuranceValue: "insuranceValue",
        cargoValue: "cargoValue",
        afFreightStatus: "afFreightStatus",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_air_quotations", null, {});
  },
};
