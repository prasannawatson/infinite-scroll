"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_lcl_quotations", [
      {
        id: 1,
        quotationId: 1,
        lclPlaceOfRecieptFk: 2,
        lclPortOfLoadingFk: 2,
        lclPortOfDeliveryFk: 2,
        lclPlaceOfDeliveryFk: 2,
        lclTermsFk: 2,
        PPCC: "Collect",
        lclCarrierFk: 3,
        drtTrnst: "Direct",
        lclTransitPortFk: 34,
        transitTime: 3,
        frequency: 50,
        validFrom: new Date(),
        validTill: new Date(),
        lclExportMovement: "lclExportMovement",
        noOfPackages: 10,
        weightKgs: 53556,
        weightLbs: 45345,
        uomWeight: 231,
        lengthCm: 123,
        lengthInches: 23,
        widthCm: 123,
        widthInches: 40,
        heightCm: 123,
        heightInches: 231,
        uomMeasurment: 12,
        volume: 3243,
        uomVolume: 12,
        chargeableKgs: 444,
        chargeableLbs: 24234,
        uomChargeable: 12,
        lclHazardous: "lclHazardous",
        lclHtsCode: "lclHtsCode",
        lclPickupAddress: "lclPickupAddress",
        lclDeliveryAddress: "lclDeliveryAddress",
        lclCommodity: "lclCommodity",
        lclConsignor: 353,
        lclConsignee: 12,
        lclControllingParty: 1,
        insuranceValue: "insuranceValue",
        cargoValue: "cargoValue",
        lclFreightStatus: "Active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_lcl_quotations", null, {});
  },
};
