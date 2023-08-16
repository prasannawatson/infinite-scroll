"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sc_fcl_quotations", {
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
      fclPlaceOfRecieptFk: {
        allowNull: false, // fcl Place of Reciept Foreign Key
        type: Sequelize.INTEGER,
      },
      fclPortOfLoadingFk: {
        allowNull: false, // fcl-Port Of Loading Foreign key
        type: Sequelize.INTEGER,
      },
      fclPortOfDeliveryFk: {
        allowNull: false, // fcl-Port Of Delivery Foreign key
        type: Sequelize.INTEGER,
      },
      fclPlaceOfDeliveryFk: {
        allowNull: false, // fcl-Place Of Delivery Foreign key
        type: Sequelize.INTEGER,
      },
      fclTermsFk: {
        allowNull: false, // fcl-Terms Foreign Key
        type: Sequelize.INTEGER,
      },
      PPCC: {
        allowNull: false, // Prepaid &Collect
        type: Sequelize.STRING,
      },
      fclCarrierFk: {
        allowNull: false, //fcl-Carrier Foreign key
        type: Sequelize.INTEGER,
      },
      drtTrnst: {
        allowNull: false, // Direct & Transit
        type: Sequelize.STRING,
      },
      fclTransitPortFk: {
        allowNull: false, //  fcl-Transit Port Foreign key
        type: Sequelize.INTEGER,
      },
      transitTime: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      fclContainer: {
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
      fclExportMovement: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      noOfPackages: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      weightKgs: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      weightLbs: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      uomWeight: {
        allowNull: false, //Unit of Measurement Weight
        type: Sequelize.INTEGER,
      },
      lengthCm: {
        allowNull: false, //length centimeter
        type: Sequelize.FLOAT,
      },
      lengthInches: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      widthCm: {
        allowNull: false, // Widht Centimeter
        type: Sequelize.FLOAT,
      },
      widthInches: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      heightCm: {
        allowNull: false, //Height Centimeter
        type: Sequelize.FLOAT,
      },
      heightInches: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      uomMeasurment: {
        allowNull: false, //Unit of Measrument
        type: Sequelize.INTEGER,
      },
      volume: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      uomVolume: {
        allowNull: false, // Unit of Measurement Volume
        type: Sequelize.INTEGER,
      },
      chargeableKgs: {
        allowNull: false, // Chargeable Kilograms
        type: Sequelize.FLOAT,
      },
      chargeableLbs: {
        allowNull: false, // Chargeable Pounds
        type: Sequelize.FLOAT,
      },
      uomChargeable: {
        allowNull: false, // Unit od Measurment Chargeable
        type: Sequelize.INTEGER,
      },
      fclHazardous: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fclHtsCode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fclPickupAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fclDeliveryAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fclCommodity: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fclConsignor: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      fclConsignee: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      fclControllingParty: {
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
      fclFreightStatus: {
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
    await queryInterface.dropTable("sc_fcl_quotations");
  },
};
