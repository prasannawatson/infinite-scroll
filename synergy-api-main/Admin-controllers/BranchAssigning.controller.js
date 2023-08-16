const db = require("../db");
var _ = require("lodash");
const BranchAssigning = require("../Admin-Models/BranchAssigning.model");
const authController = require("../Admin-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Assigned Branches Data
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
        const search = JSON.parse(req.query.search);
        const branchid = req.query.branchId;
        const countryId = req.query.countryId;
        let query =
          'select sba.id, sba."branchCountryId", sba."branchNameId", sba."employeeRole", sba."defaultBranch",\
          sba."employeeId", sba."creatorRole", sba.status, sba."createdById", sba."modifiedById",sba."companyCountryId",\
          (select sc."countryName"),\
          (select scb."saBranchName") as "branchName",\
          (select scc."saCompanyName"),\
          case when CAST(coalesce(sba."defaultBranch", \'0\') AS integer) = 1 then \'YES\'  when CAST(coalesce(sba."defaultBranch", \'0\') AS integer) = 0 then \'NO\' end as "default",\
          concat(se."empFirstName",\' \',se."empLastName") as "userName" \
          from sc_branch_assignings sba left join sc_countries sc on sc.id = sba."branchCountryId" \
          left join sa_company_branches scb on scb.id = sba."branchNameId" \
          left join sc_employees se on se.id = sba."employeeId" \
          left join sa_country_companies scc on scc.id = sba."companyCountryId"\
           where sba."branchNameId" =' +
          branchid +
          ' and sba."branchCountryId" = ' +
          countryId +
          " and";
        // if (search.branchName !== null && search.branchName !== "") {
        //   query += ' LOWER(scb."saBranchName") like \'%' + search.branchName.toLowerCase() + "%' and ";
        // }
        if (search.userName !== null && search.userName !== "") {
          query +=
            ' LOWER(se."empFirstName") like \'%' +
            search.userName.toLowerCase() +
            "%' or ";
          query +=
            ' LOWER(se."empLastName") like \'%' +
            search.userName.toLowerCase() +
            "%' and ";
        }
        // if (search.empEmail !== null && search.empEmail !== "") {
        //   query += ' LOWER(se."empEmail") like \'%' + search.empEmail.toLowerCase() + "%' and ";
        // }
        // if (search.empPhone !== null && search.empPhone !== "") {
        //   query += ' CAST(se."empPhone" AS VARCHAR) like \'%' + search.empPhone + "%' and ";
        // }
        // if (search.empSales !== null && search.empSales !== "") {
        //   query += ' LOWER(se."empSales") like \'%' + search.empSales.toLowerCase() + "%' and ";
        // }
        // if (search.designationName !== null && search.designationName !== "") {
        //   query += ' LOWER(sed."designationName") like \'%' + search.designationName.toLowerCase() + "%' and ";
        // }
        query +=
          " true LIMIT " +
          req.query.limit +
          " OFFSET " +
          req.query.limit * req.query.currentPage;
        db.query(query)
          .then((data) => {
            db.query(
              'select count(sba.id) from sc_branch_assignings sba \
            where sba."branchNameId" =' +
                branchid +
                ' and sba."branchCountryId" = ' +
                countryId +
                ""
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
            console.log(err);
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
   * @method getAll
   * @description this method will fetch all Assigned Branches Data
   * @param req
   * @param res
   * @returns void
   */
  getBranchesEmp: async (req, res) => {
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
        const employeeId = req.query.employeeId;
        let query =
          'select sba.id, sba."branchCountryId", sba."branchNameId", sba."employeeRole", sba."defaultBranch",\
          sba."employeeId", sba."creatorRole", sba.status, sba."createdById", sba."modifiedById",sba."companyCountryId",\
          (select sc."countryName"),\
          (select scb."saBranchName") as "branchName",\
          (select scc."saCompanyName"),\
          case when CAST(coalesce(sba."defaultBranch", \'0\') AS integer) = 1 then \'YES\'  when CAST(coalesce(sba."defaultBranch", \'0\') AS integer) = 0 then \'NO\' end as "default",\
          concat(se."empFirstName",\' \',se."empLastName") as "userName"\
          from sc_branch_assignings sba left join sc_countries sc on sc.id = sba."branchCountryId"\
          left join sa_company_branches scb on scb.id = sba."branchNameId"\
          left join sc_employees se on se.id = sba."employeeId"\
          left join sa_country_companies scc on scc.id = sba."companyCountryId" where sba."employeeId" =' +
          employeeId +
          "and";
        if (search.branchName !== null && search.branchName !== "") {
          query +=
            ' LOWER(scb."saBranchName") like \'%' +
            search.branchName.toLowerCase() +
            "%' and ";
        }
        if (search.countryName !== null && search.countryName !== "") {
          query +=
            ' LOWER(sc."countryName") like \'%' +
            search.countryName.toLowerCase() +
            "%' and ";
        }
        // if (search.userName !== null && search.userName !== "") {
        //   query += ' LOWER(se."empFirstName") like \'%' + search.userName.toLowerCase() + "%' or ";
        //   query += ' LOWER(se."empLastName") like \'%' + search.userName.toLowerCase() + "%' and ";
        // }
        // if (search.empEmail !== null && search.empEmail !== "") {
        //   query += ' LOWER(se."empEmail") like \'%' + search.empEmail.toLowerCase() + "%' and ";
        // }
        // if (search.empPhone !== null && search.empPhone !== "") {
        //   query += ' CAST(se."empPhone" AS VARCHAR) like \'%' + search.empPhone + "%' and ";
        // }
        // if (search.empSales !== null && search.empSales !== "") {
        //   query += ' LOWER(se."empSales") like \'%' + search.empSales.toLowerCase() + "%' and ";
        // }
        // if (search.designationName !== null && search.designationName !== "") {
        //   query += ' LOWER(sed."designationName") like \'%' + search.designationName.toLowerCase() + "%' and ";
        // }
        query +=
          " true LIMIT " +
          req.query.limit +
          " OFFSET " +
          req.query.limit * req.query.currentPage;
        db.query(query)
          .then((data) => {
            db.query(
              'select count(sba.id) from sc_branch_assignings sba \
            where sba."employeeId" =' + employeeId
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
            console.log(err.message);
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
   * @method getAll
   * @description this method will fetch all Assigned Branches Data
   * @param req
   * @param res
   * @returns void
   */
  loadBranchesEmp: async (req, res) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        // const search = JSON.parse(req.query.search);
        const employeeId = req.query.employeeId;
        let query =
          'select sba.id, sba."branchCountryId", sba."branchNameId", sba."employeeRole", sba."defaultBranch",\
          sba."employeeId", sba."creatorRole", sba.status, sba."createdById", sba."modifiedById",sba."companyCountryId",\
          (select sc."countryName"),\
          (select scb."saBranchName") as "branchName",\
          (select scc."saCompanyName"),\
          case when CAST(coalesce(sba."defaultBranch", \'0\') AS integer) = 1 then \'YES\'  when CAST(coalesce(sba."defaultBranch", \'0\') AS integer) = 0 then \'NO\' end as "default",\
          concat(se."empFirstName",\' \',se."empLastName") as "userName"\
          from sc_branch_assignings sba left join sc_countries sc on sc.id = sba."branchCountryId"\
          left join sa_company_branches scb on scb.id = sba."branchNameId"\
          left join sc_employees se on se.id = sba."employeeId"\
          left join sa_country_companies scc on scc.id = sba."companyCountryId" where sba."employeeId" =' +
          employeeId +
          'order by "defaultBranch" DESC';
        db.query(query)
          .then((data) => {
            res.send(data[0]);
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

  /**
   * @method create
   * @description this method will create new assigned branches Details to the customer
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
          branchCountryId: req.body.branchCountryId,
          branchNameId: req.body.branchNameId,
          companyCountryId: req.body.companyCountryId,
          employeeRole: req.body.employeeRole,
          defaultBranch: req.body.defaultBranch,
          employeeId: req.body.employeeId,
          creatorRole: req.body.creatorRole,
          createdById: req.body.createdById,
          modifiedById: req.body.modifiedById,
          status: req.body.status,
        };
        if (req.body.defaultBranch == true) {
          BranchAssigning.findAll({
            where: { branchNameId: req.query.branchId, defaultBranch: true },
          }).then((data) => {
            if (data[0] == null) {
              BranchAssigning.create(payload)
                .then((data) => {
                  res.send(data);
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).send({
                    message:
                      err.message ||
                      "Some error occurred while creating the assigned branches Info.",
                  });
                });
            } else {
              res.status(500).send({
                message: "Another Default admin found",
              });
            }
          });
        } else {
          BranchAssigning.create(payload)
            .then((data) => {
              res.send(data);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while creating the assigned branches Info.",
              });
            });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Assigned Branches Data based on id
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
        const id = req.query.id;
        const branchId = req.query.branchId;
        if (req.body.defaultBranch == true && req.body.employeeRole=='Admin') {
          BranchAssigning.findAll({
            where: { branchNameId: branchId, defaultBranch: true },
          }).then((data) => {
            if (data[0] == null) {
              BranchAssigning.update(req.body, {
                where: { id: id },
              })
                .then((num) => {
                  if (num == 1) {
                    res.status(200).send({
                      message: "Admin Updated Successfully",
                    });
                  } else {
                    res.send({
                      message: `Cannot update assigned branches Info with id=${id}. Maybe assigned branches Info was not found or req.body is empty!`,
                    });
                  }
                })
                .catch((err) => {
                  res.status(500).send({
                    message:
                      "Error updating assigned branches Info with id=" + id,
                  });
                });
            } else {
              res.status(500).send({
                message: "Another Default admin found",
              });
            }
          });
        } else {
          BranchAssigning.update(req.body, {
            where: { id: id },
          })
            .then((num) => {
              if (num == 1) {
                res.status(200).send({
                  message: "Admin Updated Successfully",
                });
              } else {
                res.send({
                  message: `Cannot update assigned branches Info with id=${id}. Maybe assigned branches Info was not found or req.body is empty!`,
                });
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: "Error updating assigned branches Info with id=" + id,
              });
            });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete assigned branches Info data based on id
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
        BranchAssigning.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "assigned branches Info was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete assigned branches Info with id=${id}. Maybe assigned branches Info was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete assigned branches Info with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getAll
   * @description this method will fetch all Admin Login data
   * @param req
   * @param res
   * @returns void
   */
  getCountry: async (req, res) => {
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
          'select scc.id, scc."saCountryId",\
        (select sc."countryName") as "countryName"\
        from sa_country_companies scc \
        left join sc_countries sc on sc.id = scc."saCountryId"  where scc."paSaGlobalCompanyId" = ' +
            id
        ).then((data) => {
          res.send(data[0]);
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /* @method getAll
   * @description this method will fetch all Admin Login data
   * @param req
   * @param res
   * @returns void
   */
  getBranches: async (req, res) => {
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
          'select scb.id,scb."saCompanyCountryId", scc."saStateId", scc."saCityId",scb."saBranchName"\
        from sa_company_branches scb \
        left join sa_country_companies scc on scc.id = scb."saCompanyCountryId" \
        left join sc_states ss on ss.id = scb."saBranchStateId"  left join sc_cities sc on sc.id = scb."saBranchCityId" \
        where scb."saCompanyCountryId" = ' +
            req.query.countryId +
            ' and scb."paSaGlobalCompanyId" =' +
            req.query.userId
        ).then((data) => {
          res.send(data[0]);
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
