"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sc_slab_rates", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      segmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      airLineCarrierId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cargoTypeId: {
        type: Sequelize.INTEGER, 
        allowNull: false,
      },
      rateType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      polId: {
        type: Sequelize.INTEGER, //Air Freight Port Of Loading Id
        allowNull: false,
      },
      podId: {
        type: Sequelize.INTEGER, //Air Freight Port Of Delivery Id
        allowNull: false,
      },
      minBuyRate: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      sellRate: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      validFrom:{
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      validTill:{
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      fromKg:{
        type: Sequelize.FLOAT,
        allowNull:false
      },
      toKg:{
        type: Sequelize.FLOAT,
        allowNull:false
      },
      buyRate:{
        type: Sequelize.FLOAT,
        allowNull:false
      },
      minSellRate:{
        type: Sequelize.FLOAT,
        allowNull:true
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      globalCompanyId:{
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.createTable("sc_airline_schedules", {});
  },
};
