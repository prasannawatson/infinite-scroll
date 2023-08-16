const db = require("../db");
var _ = require("lodash");
const roles = require("../roles");
const Employee = require("../Admin-Models/Employee.model");
const User = require("../Admin-Models/User.model");
const authController = require("../Admin-controllers/auth");
const bcrypt = require("bcrypt");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Employee data
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
          'select se.id ,se."empCode" ,\
          se."empDeptId" ,se."empDesigId" ,se."empDob" ,se."empEmail" ,se."empFirstName" ,\
          se."empGender" ,se."empIdKey" ,se."empLastName" ,se."empPhone" ,se."empSales" ,se."empStatus" ,\
          (select sed."designationName")as "designationName"\
          from sc_employees se left join sc_employee_designations sed on sed.id =se."empDesigId"\
          WHERE se."paSaGlobalCompanyId"='+req.query.compaanyId+' and'
        )
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            console.log(err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Employee.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getAll
   * @description this method will fetch all Employee data
   * @param req
   * @param res
   * @returns void
   */
  assignBranchGet: async (req, res) => {
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
          'select se.id,\
          concat(se."empFirstName",\' \',se."empLastName")as "employeeName" \
          from sc_employees se where se."empType" = (:empType) and se."paSaGlobalCompanyId"=(:branchId)',
          {
            replacements: {
              empType: req.query.type,
              branchId: req.query.branchId,
            },
          }
        )
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Employee.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method findAndCountAll
   * @description this method will Find And Show all employee data
   * @param req
   * @param res
   * @returns void
   */
  findAndCountAll: async (req, res) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const search = JSON.parse(req.query.search);
        let query =
          'select se.id ,se."empBranchNameId" ,se."empCode" ,se."empBranchCountryId",se."empType",\
          se."empDeptId" ,se."empDesigId" ,se."empDob" ,se."empEmail" ,se."empFirstName" ,se."empType",\
          se."empGender" ,se."empIdKey" ,se."empLastName" ,se."empPhone", se."employeeRole" ,se.password as "empPassword",\
          se."empSales" ,se."empStatus",se."empStatus" as status ,\
          (select scb."saBranchName"),\
          concat (se."empFirstName",\' \',se."empLastName") as "employeeName",\
          (select sed."designationName")as "designationName"\
          from sc_employees se left join sc_employee_designations sed on sed.id =se."empDesigId" left join \
          sa_company_branches scb on scb.id = se."empBranchNameId"\
          WHERE se."paSaGlobalCompanyId"=' + req.query.globalCompanyId + "and";
        if (search.saBranchName !== null && search.saBranchName !== "") {
          query +=
            ' LOWER(scb."saBranchName") like \'%' +
            search.saBranchName.toLowerCase() +
            "%' and ";
        }
        if (search.employeeName !== null && search.employeeName !== "") {
          query += ' LOWER(se."empFirstName") like \'%' +search.employeeName.toLowerCase() + "%' or ";
          query += ' LOWER(se."empLastName") like \'%' + search.employeeName.toLowerCase() + "%' and ";
        }
        if (search.empEmail !== null && search.empEmail !== "") {
          query +=
            ' LOWER(se."empEmail") like \'%' +
            search.empEmail.toLowerCase() +
            "%' and ";
        }
        if (search.empPhone !== null && search.empPhone !== "") {
          query +=
            ' CAST(se."empPhone" AS VARCHAR) like \'%' +
            search.empPhone +
            "%' and ";
        }
        if (search.empSales !== null && search.empSales !== "") {
          query +=
            ' LOWER(se."empSales") like \'%' +
            search.empSales.toLowerCase() +
            "%' and ";
        }
        if (search.designationName !== null && search.designationName !== "") {
          query +=
            ' LOWER(sed."designationName") like \'%' +
            search.designationName.toLowerCase() +
            "%' and ";
        }

        query +=
          " true LIMIT " +
          req.query.limit +
          " OFFSET " +
          req.query.limit * req.query.currentPage;
        db.query(query)
          .then((data) => {
            db.query(
              'select count(sc_employees.id) from sc_employees \
            WHERE sc_employees."paSaGlobalCompanyId"=' +
                req.query.globalCompanyId
            ).then((count) => {
              const response = {
                count: count[0][0].count,
                data: data[0],
                currentPage: req.query.currentPage,
                limit: req.query.limit,
              };
              res.send(response);
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Charges.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  viewEmployee:async(req,res)=>{
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        console.log(req.query.globalCompanyId,req.query.id)
        let query =
          'select se.id ,se."empBranchNameId" ,se."empCode" ,se."empBranchCountryId",se."empType",\
          se."empDeptId" ,se."empDesigId" ,se."empDob" ,se."empEmail" ,se."empFirstName" ,se."empType",\
          se."empGender" ,se."empIdKey" ,se."empLastName" ,se."empPhone", se."employeeRole" ,se.password as "empPassword",\
          se."empSales" ,se."empStatus",se."empStatus" as status ,\
          (select scb."saBranchName"),\
          (select sc."countryName"),\'-\' as "Alias",\
          concat (se."empFirstName",\' \',se."empLastName") as "employeeName",\
          (select sed."designationName")as "designationName"\
          from sc_employees se \
          left join sc_employee_designations sed on sed.id =se."empDesigId" \
          left join sa_company_branches scb on scb.id = se."empBranchNameId"\
          left  join sc_countries sc  on sc.id =scb."saBranchCountryId" \
          WHERE se."paSaGlobalCompanyId"=' + req.query.companyGlobalId +'and se.id= ' +req.query.id ;
       
          db.query(query)
          .then((data) => {
              res.send(data[0]);
          })
          .catch((err) => {
            console.log(err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Charges.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }

  },
  /**
   * @method create
   * @description this method will create new Employee
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
          empStatus: req.body.empStatus,
          empSales: req.body.empSales,
          empPhone: req.body.empPhone,
          empLastName: req.body.empLastName,
          empIdKey: req.body.empIdKey,
          empGender: req.body.empGender,
          empFirstName: req.body.empFirstName,
          empEmail: req.body.empEmail,
          empDob: req.body.empDob,
          empDeptId: req.body.empDeptId,
          empCode: req.body.empCode,
          empDesigId: req.body.empDesigId,
          createdBy: req.body.createdBy,
          modifiedBy: req.body.modifiedBy,
          empType: req.body.empType,
          employeeRole: req.body.employeeRole,
          password: req.body.empPassword,
          paSaGlobalCompanyId: req.body.paSaGlobalCompanyId,
          empBranchCountryId: req.body.empBranchCountryId,
          empBranchNameId: req.body.empBranchNameId,
          creatorRole: req.body.creatorRole,
          createdBy: req.body.createdBy,
          modifiedBy: req.body.modifiedBy,
        };
        await Employee.create(payload)
          .then(async (data) => {
            const salt = await bcrypt.genSalt();
            const userPayload = {
              employeeId: data.id,
              firstName: req.body.empFirstName,
              lastName: req.body.empLastName,
              userName: req.body.empFirstName,
              email: req.body.empEmail,
              mobile: req.body.empPhone,
              roles: req.body.employeeRole,
              userRole: req.body.empType,
              paSaGlobalCompanyId: req.body.paSaGlobalCompanyId,
              saCountryCompanyId: req.body.empBranchCountryId,
              saBranchId: req.body.empBranchNameId,
              creatorRole: req.body.creatorRole,
              createdBy: req.body.createdBy,
              modifiedBy: req.body.modifiedBy,
              password: await bcrypt.hash(req.body.empPassword, salt),
            };
            await User.create(userPayload)
              .then((resUser) => {
                res.send(data);
              })
              .catch((err) => {
                res.status(500).send({
                  message:
                    err.message ||
                    "Some error occurred while creating the user.",
                });
              });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Employee.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find And Show Employee data based on id
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
        Employee.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Employee with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Employee with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Employee data based on id
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
        await Employee.update(req.body, {
          where: { id: id },
        })
          .then(async (data) => {
            const salt = await bcrypt.genSalt();
            const userPayload = {
              employeeId: data.id,
              firstName: req.body.empFirstName,
              lastName: req.body.empLastName,
              userName: req.body.empFirstName,
              email: req.body.empEmail,
              mobile: req.body.empPhone,
              roles: req.body.employeeRole,
              userRole: req.body.empType,
              paSaGlobalCompanyId: req.body.paSaGlobalCompanyId,
              saCountryCompanyId: req.body.empBranchCountryId,
              saBranchId: req.body.empBranchNameId,
              creatorRole: req.body.creatorRole,
              createdBy: req.body.createdBy,
              modifiedBy: req.body.modifiedBy,
              password: await bcrypt.hash(req.body.empPassword, salt),
            };
            await User.update(userPayload, {
              where: { employeeId: id },
            })
              .then((resUser) => {
                console.log(resUser)
                res.send(data);
              })
              .catch((err) => {
                console.log(err);
                res.status(500).send({
                  message:
                    err.message ||
                    "Some error occurred while creating the user.",
                });
              });
          })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Employee was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Employee with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Employee data based on id
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
        Employee.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Employee was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Employee with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
