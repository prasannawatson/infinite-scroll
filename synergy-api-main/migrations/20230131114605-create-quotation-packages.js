'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sc_quotation_packages', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quoteIdFk: {
      type: Sequelize.INTEGER, //Quotation Id Foreign key
      allowNull: false,
    },
    packageTypeFk: {
      type: Sequelize.INTEGER, //Package Type Id Foreign key
      allowNull: false,
    },
    noOfPackages: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    packageMeasurment: {
      type: Sequelize.STRING, 
      allowNull: false,
    },
    packageUnit: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    packageWeight: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    packageLength: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    packageWidth: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    packageHeight: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    packageVolume: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    packageHazardous: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    packageHtsCode: {
      type: Sequelize.STRING,
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
      type: Sequelize.DATE
    }
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sc_quotation_packages');
  }
};
