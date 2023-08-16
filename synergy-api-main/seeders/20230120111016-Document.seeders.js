"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("sc_document_infos", [
      {
        id: 10,
        documentCategory: "CommercialInvoice",
        documentUploadName: "C:Fakepathdbcon_pdo.php",
        fclBookingIdFk: 4,
        documentCreatedTime: new Date(),
        status: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sc_document_infos", null, {});
  },
};
