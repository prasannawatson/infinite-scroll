'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("sc_carrier_types", {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
      },
      carrierTypeName: {
          type: Sequelize.STRING,
          allowNull: false,
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
    await queryInterface.dropTable("sc_carrier_types");
  }
};
