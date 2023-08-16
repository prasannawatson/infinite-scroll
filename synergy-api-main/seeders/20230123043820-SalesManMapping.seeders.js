"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sc_salesman_mappings", [
      {
        companyId: 1,
        employeeId: 1,
        segments: '{"lclExports":true,"fclImports":true,"trackingInbound":true,"trackingOutbound":false,"crossCountryFcl":false,"customClearenceExports":false,"projectCargo":false,"fclExports":true,"airExports":true,"truckingOutbound":false,"crossCountryLcl":false,"warehouse":false,"lclImports":false,"airImports":false,"crossCountryAir":false,"customClearenceImports":false,"serviceJob":false}',
        priority: "Primary",
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyId: 1,
        employeeId: 2,
        segments: '{"lclExports":false,"fclImports":false,"trackingInbound":false,"trackingOutbound":true,"crossCountryFcl":true,"customClearenceExports":false,"projectCargo":false,"fclExports":false,"airExports":false,"truckingOutbound":false,"crossCountryLcl":false,"warehouse":false,"lclImports":true,"airImports":true,"crossCountryAir":true,"customClearenceImports":false,"serviceJob":false}',
        priority: "Secondary",
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyId: 6,
        employeeId: 2,
        segments: '{"lclExports":true,"fclImports":true,"trackingInbound":true,"trackingOutbound":false,"crossCountryFcl":false,"customClearenceExports":false,"projectCargo":false,"fclExports":true,"airExports":true,"truckingOutbound":false,"crossCountryLcl":false,"warehouse":false,"lclImports":false,"airImports":false,"crossCountryAir":false,"customClearenceImports":false,"serviceJob":false}',
        priority: "Primary",
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyId: 2,
        employeeId: 3,
        segments: '{"lclExports":true,"fclImports":true,"trackingInbound":true,"trackingOutbound":false,"crossCountryFcl":false,"customClearenceExports":false,"projectCargo":false,"fclExports":false,"airExports":false,"truckingOutbound":false,"crossCountryLcl":false,"warehouse":false,"lclImports":false,"airImports":false,"crossCountryAir":false,"customClearenceImports":false,"serviceJob":false}',
        priority: "Primary",
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyId: 2,
        employeeId: 2,
        segments: '{"lclExports":true,"fclImports":true,"trackingInbound":true,"trackingOutbound":true,"crossCountryFcl":false,"customClearenceExports":false,"projectCargo":false,"fclExports":true,"airExports":true,"truckingOutbound":false,"crossCountryLcl":false,"warehouse":false,"lclImports":false,"airImports":false,"crossCountryAir":false,"customClearenceImports":false,"serviceJob":false}',
        priority: "Secondary",
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyId: 10,
        employeeId: 2,
        segments: '{"lclExports":true,"fclImports":true,"trackingInbound":true,"trackingOutbound":false,"crossCountryFcl":false,"customClearenceExports":false,"projectCargo":false,"fclExports":true,"airExports":false,"truckingOutbound":false,"crossCountryLcl":false,"warehouse":false,"lclImports":false,"airImports":false,"crossCountryAir":false,"customClearenceImports":false,"serviceJob":false}',
        priority: "Primary",
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyId: 20,
        employeeId: 3,
        segments: '{"lclExports":true,"fclImports":true,"trackingInbound":true,"trackingOutbound":false,"crossCountryFcl":false,"customClearenceExports":false,"projectCargo":false,"fclExports":false,"airExports":false,"truckingOutbound":false,"crossCountryLcl":false,"warehouse":false,"lclImports":false,"airImports":false,"crossCountryAir":false,"customClearenceImports":false,"serviceJob":false}',
        priority: "Primary",
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sc_salesman_mappings", null, {});
  },
};
