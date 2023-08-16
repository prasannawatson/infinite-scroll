"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_fcl_quotations", [
      {
        id: 1,
        quotationId: 1,
        fclPlaceOfRecieptFk: 2,
        fclPortOfLoadingFk: 2,
        fclPortOfDeliveryFk: 2,
        fclPlaceOfDeliveryFk: 2,
        fclTermsFk: 2,
        PPCC: "Collect",
        fclCarrierFk: 3,
        drtTrnst: "Direct",
        fclTransitPortFk: 34,
        transitTime: 3,
        fclContainer: 3,
        frequency: 50,
        validFrom: new Date(),
        validTill: new Date(),
        fclExportMovement: "fclExportMovement",
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
        fclHazardous: "fclHazardous",
        fclHtsCode: "fclHtsCode",
        fclPickupAddress: "fclPickupAddress",
        fclDeliveryAddress: "fclDeliveryAddress",
        fclCommodity: "fclCommodity",
        fclConsignor: 353,
        fclConsignee: 12,
        fclControllingParty: 1,
        insuranceValue: "insuranceValue",
        cargoValue: "cargoValue",
        fclFreightStatus: "Active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_fcl_quotations", null, {});
  },
};
