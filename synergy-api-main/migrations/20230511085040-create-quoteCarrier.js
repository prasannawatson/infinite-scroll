'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("sc_quote_carriers", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      quoteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      airlineNameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quoteCarrierStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      route:{
        type: Sequelize.STRING,
        allowNull: false
      },
      directTransitPortId:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      transitDays:{
        type: Sequelize.STRING,
        allowNull: false
      },
      serviceType:{
        type: Sequelize.STRING,
        allowNull: true
      },
      carrierNotes:{
        type: Sequelize.STRING,
        allowNull: true
      },
      carrierType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quoteCarrierStatus:{
        type: Sequelize.STRING,
        allowNull: true
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      modifiedBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sc_quote_carriers');
  }
};
