"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_land_quotations", [
      {
        id: 2,
        quotationId: 2,
        landPlaceOfRecieptFk: 333,
        landPlaceOfDeliveryFk: 4444,
        landTermsFk: 55555,
        PPCC: "CC",
        landCarrierFk: 2,
        landVehicleType: "landVehicleType",
        drtTrnst: "Transit",
        landTransitPlaceFk: 2222,
        transitTime: 24244,
        frequency: 1000,
        validFrom: new Date(),
        validTill: new Date(),
        landExportMovement: "landExportMovement",
        noOfPackages: 10,
        weightKgs: 999,
        weightLbs: 888,
        uomWeight: 777,
        lengthCm: 42434,
        lengthInches: 80,
        widthCm: 500,
        widthInches: 50,
        heightCm: 10,
        heightInches: 10,
        uomMeasurment: 2434,
        volume: 4444,
        uomVolume: 2423,
        chargeableKgs: 52566,
        chargeableLbs: 235254,
        uomChargeable: 34235,
        landHazardous: "landHazardous",
        landHtsCode: "landHtsCode",
        landPickupAddress: "landPickupAddress",
        landDeliveryAddress: "landDeliveryAddress",
        landCommodity: "landCommodity",
        landConsignor: 2,
        landConsignee: 2,
        landControllingParty: 2,
        insuranceValue: "insuranceValue",
        cargoValue: "cargoValue",
        landFreightStatus: "Active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_land_quotations", null, {});
  },
};
