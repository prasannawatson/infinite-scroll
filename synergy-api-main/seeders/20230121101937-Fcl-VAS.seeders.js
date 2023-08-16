"use strict";

const { times } = require("lodash");
const { TIME } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_fcl_vas", [
      {
        id: 2,
        bookingIdFk: 3,
        customerNameIdFk: 2,
        truckerName: "rishi",
        truckerPhone: 241548658,
        truckerMobile: 86578356,
        truckerMail: "rishikesh@gmail.com",
        truckerAddress: "No 4/416, V.O.C street, kalli amman nagar, polichalur",
        containerPickUp: "ANNA NAGAR",
        stuffingAddress: "ANNA NAGAR",
        containerDelivery: "ANNA NAGAR",
        pickupPlace: "ANNA NAGAR",
        contactPerson: "rishi",
        contactPhone: 78356746,
        contactMobile: 5648756,
        contactMail: "rishikesh@gmail.com",
        pickupDate: new Date(),
        pickupTime: new Date(),
        pickupAddress: "ANNA NAGAR",
        vasStatus: true,
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_fcl_vas", null, {});
  },
};
