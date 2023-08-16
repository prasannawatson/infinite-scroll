"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sc_land_quotations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quotationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      landPlaceOfRecieptFk: {
        allowNull: false,
        type: Sequelize.INTEGER, //Land Place Of Reciept Foreign key
      },
      landPlaceOfDeliveryFk: {
        allowNull: false,
        type: Sequelize.INTEGER, //Land Place Of Delivery Foreign key
      },
      landTermsFk: {
        allowNull: false,
        type: Sequelize.INTEGER, //Land Terms Foreign key
      },
      PPCC: {
        allowNull: false,
        type: Sequelize.STRING, //prepaid & Collect
      },
      landCarrierFk: {
        allowNull: false,
        type: Sequelize.INTEGER, //Land Carrier Foreign key
      },
      landVehicleType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      drtTrnst: {
        allowNull: false,
        type: Sequelize.STRING, // Direct & Transit
      },
      landTransitPlaceFk: {
        allowNull: false,
        type: Sequelize.INTEGER, //Land Transit Place Foreign key
      },
      transitTime: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      frequency: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      validFrom: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      validTill: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      landExportMovement: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      noOfPackages: {
        allowNull: false,
        type: Sequelize.INTEGER, //Number Of Packages
      },
      weightKgs: {
        allowNull: false,
        type: Sequelize.FLOAT, //Wight Kilograms
      },
      weightLbs: {
        allowNull: false,
        type: Sequelize.FLOAT, // Wight Pounds
      },
      uomWeight: {
        allowNull: false,
        type: Sequelize.INTEGER, // Unit of Measurement  Weight
      },
      lengthCm: {
        allowNull: false,
        type: Sequelize.FLOAT, //Lenght Centimeter
      },
      lengthInches: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      widthCm: {
        allowNull: false,
        type: Sequelize.FLOAT, //Width Centimeter
      },
      widthInches: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      heightCm: {
        allowNull: false,
        type: Sequelize.FLOAT, //Height Centimeter
      },
      heightInches: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      uomMeasurment: {
        allowNull: false,
        type: Sequelize.INTEGER, // UNit Of measurement
      },
      volume: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      uomVolume: {
        allowNull: false,
        type: Sequelize.INTEGER, //Unit Of Measurement
      },
      chargeableKgs: {
        allowNull: false,
        type: Sequelize.FLOAT, //Chargeable Kilograms
      },
      chargeableLbs: {
        allowNull: false,
        type: Sequelize.FLOAT, //Chargeable Pounds
      },
      uomChargeable: {
        allowNull: false,
        type: Sequelize.INTEGER, //UNit of Measurement Chargeable
      },
      landHazardous: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      landHtsCode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      landPickupAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      landDeliveryAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      landCommodity: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      landConsignor: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      landConsignee: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      landControllingParty: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      insuranceValue: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cargoValue: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      landFreightStatus: {
        allowNull: false,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("sc_land_quotations");
  },
};
