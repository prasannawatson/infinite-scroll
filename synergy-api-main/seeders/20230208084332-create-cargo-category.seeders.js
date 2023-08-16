"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_cargo_categories", [
      {
        cargoTypeName: "GCR",
        cargoTypeDescription: "General Cargo",
        status: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cargoTypeName: "DGR",
        cargoTypeDescription: "Dangerous Cargo Rate",
        status: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cargoTypeName: "EXP",
        cargoTypeDescription: "Express",
        status: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cargoTypeName: "PHARMA",
        cargoTypeDescription: "Pharma Cargo",
        status: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cargoTypeName: "PERISHABLE",
        cargoTypeDescription: "Peirshable Cargo",
        status: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cargoTypeName: "COU",
        cargoTypeDescription: "Courier Cargo",
        status: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('sc_cargo_categories', null, {});
  },
};
