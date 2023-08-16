const db = require("../db");
var _ = require("lodash");
const SalesManMapping = require("../Admin-Models/SalesManMapping.model");
const authController = require("../Admin-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all SalesManMapping data
   * @param req
   * @param res
   * @returns void
   */
  getAll: async (req, res) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        db.query(
          'select \
        ssm."id" as "id",\
        ssm."companyId" as "companyId",\
        ssm."employeeId" as "employeeId",\
        ssm."segments"  as "segments",\
        ssm."priority" as "priority",\
        se."empFirstName" as "empFirstName",\
        se."empLastName" as "empLastName",\
        se."empLastName" as "empLastName",\
        sed."designationName" as "designationName",\
        sed2."departmentName" as "departmentName"\
        from \
        sc_salesman_mappings ssm join sc_employees se on ssm."employeeId" = se.id \
        join sc_employee_designations sed on sed.id = se."empDesigId" \
        left join sc_employee_departments sed2 on sed2.id = se."empDeptId" \
        where ssm."companyId" = ' +
            req.query.companyId +
            " \
        "
        )
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving SalesManMapping.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new SalesManMapping
   * @param req
   * @param res
   * @returns void
   */
  create: async (req, res) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const payload = {
          id: req.body.id,
          companyId: req.body.companyId,
          employeeId: req.body.employeeId,
          segments: req.body.segments,
          priority: req.body.priority,
        };

        await SalesManMapping.create(payload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the SalesManMapping.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show SalesManMapping data based on id
   * @param req
   * @param res
   * @returns void
   */
  find: async (req, res, next) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        db.query(
          `select ssm.id , se.id,\
        concat(se."empFirstName",'-',se."empLastName",'(',ssm.priority,')') as "employeeName"\
        from sc_salesman_mappings ssm,sc_employees se where se.id = ssm."employeeId" and ssm."companyId" =(:id)`,
          {
            replacements: { id: req.params.id },
          }
        )
          .then((data) => {
            if (data) {
              res.send(data[0]);
            } else {
              res.status(404).send({
                message: `Cannot find SalesManMapping with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving SalesManMapping with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update SalesManMapping data based on id
   * @param req
   * @param res
   * @returns void
   */
  update: async (req, res, next) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        SalesManMapping.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "SalesManMapping was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update SalesManMapping with id=${id}. Maybe SalesManMapping was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating SalesManMapping with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete SalesManMapping data based on id
   * @param req
   * @param res
   * @returns void
   */
  delete: async (req, res, next) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        SalesManMapping.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "SalesManMapping was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete SalesManMapping with id=${id}. Maybe SalesManMapping was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete SalesManMapping with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
