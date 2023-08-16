"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sc_charges_mappings", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      chargeNameFk: {
        type: Sequelize.INTEGER, //charge name foreign key
        allowNull: false,
      },
      chargeContainerIdFk: {
        type: Sequelize.INTEGER, //charge Container Id Foreign key
        allowNull: false,
      },
      chargeCategoryFk: {
        type: Sequelize.STRING, //charge category foreign key
        allowNull: false,
      },
      chargeUOMFk: {
        type: Sequelize.INTEGER, //charge Unit of Measurement foreign key
        allowNull: false,
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
    await queryInterface.dropTable("sc_charges_mappings");
  },
};
