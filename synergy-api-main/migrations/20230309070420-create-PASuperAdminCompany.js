'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("pa_global_companies", {//poweradmin global companies
      id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    paSaCompanyName: {
      type: Sequelize.STRING,//Power Admin Super Admin Company Name
      allowNull: false,
    },
    paSaCompanyWebsite: {
      type: Sequelize.STRING,//Power Admin Super Admin Company website
      allowNull: false,
    },
    paSaFirstName: {
      type: Sequelize.STRING,//Power Admin Super Admin First Name
      allowNull: false,
    },
    paSaLastName: {
      type: Sequelize.STRING,//Power Admin Super Admin Last Name
      allowNull: false,
    },
    paSaPrimaryEmail: {
      type: Sequelize.STRING,//Power Admin Super Admin primary Email
      allowNull: false,
    },
    paSaAlternateEmail: {
      type: Sequelize.STRING,//Power Admin Super Admin alternate email
      allowNull: true,
    },
    paSaPrimaryNumber: {
      type: Sequelize.BIGINT,//Power Admin Super Admin primary Number
      allowNull: false,
    },
    paSaAlternateNumber: {
      type: Sequelize.BIGINT,//Power Admin Super Admin alternate number
      allowNull: true,
    },
    paSaCompanySize: {
      type: Sequelize.INTEGER,//Power Admin Super Admin Company Size
      allowNull: true,
    },
    paSaCompanyAddress: {
      type: Sequelize.STRING,//Power Admin Super Admin Company Address
      allowNull: false,
    },
    paSaCountryId: {
      type: Sequelize.INTEGER,//Power Admin Super Admin Company Country Id from sc_countries Table
      allowNull: false,
    },
    paSaStateId: {
      type: Sequelize.INTEGER,//Power Admin Super Admin Company State Id from sc_states Table
      allowNull: false,
    },
    paSaCityId: {
      type: Sequelize.INTEGER,//Power Admin Super Admin Company City Id from sc_cities Table
      allowNull: false,
    },
    paSaCompanyZip: {
      type: Sequelize.STRING,//Power Admin Super Admin Company Zipcode
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    createdPaId: {
      type: Sequelize.INTEGER,//Created Power Admin Id
      allowNull: false,
    },
    modifiedPaId: {
      type: Sequelize.INTEGER,//Modified Power Admin Id
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
    })    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.createTable("pa_global_companies", {});
  }
};
