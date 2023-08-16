const db = require("../db");
var _ = require("lodash");
const adminLogin = require("../Admin-Models/AdminLogin.model");
const authController = require("../Admin-controllers/auth");
const bcrypt = require("bcrypt");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Admin Login data
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
        let query =
          'select al.id, al."branchAdminFirstName", al."branchAdminLastName", al."branchAdminEmail",\
          al."branchAdminPhone", al.status, al."role", al."createdSAId", al."modifiedSAId",\
          concat(sl."paSaFirstName",\' \',sl."paSaLastName") as "createdSAName",\
          concat(al."branchAdminFirstName",\' \',al."branchAdminLastName") as "adminName"\
          from admin_logins al left join sa_logins sl on sl.id = al."createdSAId" WHERE';
        if (
          search.branchAdminEmail !== null &&
          search.branchAdminEmail !== ""
        ) {
          query +=
            ' LOWER(al."branchAdminEmail") like \'%' +
            search.branchAdminEmail.toLowerCase() +
            "%' and ";
        }
        if (search.createdSAName !== null && search.createdSAName !== "") {
          query +=
            ' LOWER(sl."paSaFirstName") like \'%' +
            search.createdSAName.toLowerCase() +
            "%' or ";
          query +=
            ' LOWER(sl."paSaLastName") like \'%' +
            search.createdSAName.toLowerCase() +
            "%' and ";
        }
        if (search.adminName !== null && search.adminName !== "") {
          query +=
            ' LOWER(al."branchAdminFirstName") like \'%' +
            search.adminName.toLowerCase() +
            "%' or ";
          query +=
            ' LOWER(al."branchAdminLastName") like \'%' +
            search.adminName.toLowerCase() +
            "%' and ";
        }
        if (
          search.branchAdminPhone !== null &&
          search.branchAdminPhone !== ""
        ) {
          query +=
            ' CAST(al."branchAdminPhone" AS VARCHAR) like \'%' +
            search.branchAdminPhone +
            "%' and ";
        }
        query +=
          " true LIMIT " +
          req.query.limit +
          " OFFSET " +
          req.query.limit * req.query.currentPage;
        db.query(query)
          .then((data) => {
            db.query("select count(admin_logins.id) from admin_logins").then(
              (count) => {
                const response = {
                  count: count[0][0].count,
                  data: data[0],
                  currentPage: req.query.currentPage,
                  limit: req.query.limit,
                };
                res.send(response);
              }
            );
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving adminLogin.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new Admin Login
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
        const salt = await bcrypt.genSalt();
        const payload = {
          branchAdminFirstName: req.body.branchAdminFirstName,
          branchAdminLastName: req.body.branchAdminLastName,
          branchAdminEmail: req.body.branchAdminEmail,
          branchAdminPhone: req.body.branchAdminPhone,
          branchAdminPassword: await bcrypt.hash(
            req.body.branchAdminPassword,
            salt
          ),
          status: req.body.status,
          role: req.body.role,
          createdSAId: req.body.createdSAId,
          modifiedSAId: req.body.modifiedSAId,
        };
        await adminLogin
          .create(payload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Admin Login.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Admin Login data based on id
   * @param req
   * @param res
   * @returns void
   */
  find: async (req, res, next) => {
    try {
      const id = req.params.id;
      adminLogin
        .findByPk(id)
        .then((data) => {
          if (data) {
            res.send(data);
          } else {
            res.status(404).send({
              message: `Cannot find admin login with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error retrieving admin login with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Admin Login data based on id
   * @param req
   * @param res
   * @returns void
   */
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const salt = await bcrypt.genSalt();
      const payload = {
        branchAdminFirstName: req.body.branchAdminFirstName,
        branchAdminLastName: req.body.branchAdminLastName,
        branchAdminEmail: req.body.branchAdminEmail,
        branchAdminPhone: req.body.branchAdminPhone,
        branchAdminPassword: await bcrypt.hash(
          req.body.branchAdminPassword,
          salt
        ),
        status: req.body.status,
        role: req.body.role,
        createdSAId: req.body.createdSAId,
        modifiedSAId: req.body.modifiedSAId,
      };
      adminLogin
        .update(payload, {
          where: { id: id },
        })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Admin login was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update Admin login with id=${id}. Maybe Admin login was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Admin login with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Admin Login data based on id
   * @param req
   * @param res
   * @returns void
   */
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      adminLogin
        .destroy({
          where: { id: id },
        })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Admin Login was deleted successfully!",
            });
          } else {
            res.send({
              message: `Cannot delete Admin Login with id=${id}. Maybe Admin Login was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Could not delete Admin Login with id=" + id,
          });
        });
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
  checkEmail: async (req, res) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const email = req.params.id;
        adminLogin
          .findOne({
            where: {branchAdminEmail:email},
          })
          .then((data) => {
            if (data) {
              res.send(true)
            } else {
              res.status(404).send({
                message: `Cannot find admin login with id=${email}.`,
              });
            }
          })
          .catch((err) => {
            console.log(err.message)
            res.status(500).send({
              message: "Error retrieving admin login with id=" + email,
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
        db.query('select scc."saCountryId",\
        (select sc."countryName") as "countryName"\
        from sa_country_companies scc \
        left join sc_countries sc on sc.id = scc."saCountryId"  where scc."createdSAId" = '+id)
        .then((data) => {
          res.send(data[0]);
        })
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
        db.query('select scb.id,scb."saCompanyCountryId", scc."saStateId", scc."saCityId",scb."saBranchName"\
        from sa_company_branches scb \
        left join sa_country_companies scc on scc.id = scb."saCompanyCountryId" \
        left join sc_states ss on ss.id = scb."saBranchStateId"  left join sc_cities sc on sc.id = scb."saBranchCityId" \
        where scb."saBranchCountryId" = '+req.query.countryId+' and scb."createdSAId" ='+req.query.userId)
        .then((data) => {
          res.send(data[0]);
        })
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
