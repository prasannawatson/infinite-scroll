"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sc_countries", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      countryName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      countryCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      continentName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      continent: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      currencyCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      languages: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      capital: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      north: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      south: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      east: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      west: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      fipsCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isoNumeric: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      isoAlpha3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      geoNameId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      zoneName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gmtOffSet: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("sc_countries");
  },
};
