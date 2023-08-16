"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_fcl_job_details", [
      {
        id: 6,
        fclJobNum: "John Doe",
        fclExpBookingId: "",
        fclJobDate: new Date(),
        fclJobMbl: "sdffvds",
        fclJobMblDate: new Date(),
        fclJobAgent: 18,
        fclJobAgentAddress: "32, KATCHALEESWARA AGHRM, KATCHALEESWARA AGHRM,",
        fclJobBlType: "wCDVW",
        fclJobFt: "vbafd",
        fclJobDm: "S",
        fclJobPor: 3,
        fclJobPol: 3,
        fclJobPodischarge: 3,
        fclJobPod: 3,
        fclJobEtd: new Date(),
        fclJobEta: new Date(),
        fclJobAtd: new Date(),
        fclJobAta: new Date(),
        fclJobCarrier: 352344,
        fclJobVessel: 23,
        fclJobVoyage: "444",
        fclJobMove: 34,
        fclJobNotes: "ffdsdf",
        fclJobStatus: "Active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_fcl_job_details", null, {});
  },
};
