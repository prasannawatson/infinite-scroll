const db = require("../db");
var _ = require("lodash");
const PASuperAdmin = require("../Admin-Models/PASuperAdminCompany.model");
const authController = require("../Admin-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Super Admin Company data
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
        PASuperAdmin.findAll()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving PASuperAdmin.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method findAndCountAll
   * @description this method will Find and Show all Super Admin Company data
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
          'select pgc.id,pgc."paSaCompanyName",pgc."paSaFirstName",pgc."paSaLastName",\
          pgc."paSaCompanyWebsite", pgc."paSaPrimaryEmail",\
          pgc."paSaAlternateEmail",pgc."paSaPrimaryNumber",pgc."paSaAlternateNumber",pgc."paSaCompanySize",\
          pgc."paSaCompanyAddress",pgc."paSaCompanyZip",pgc.status,pgc."paSaCountryId",pgc."createdPaId",pgc."modifiedPaId",\
          pgc."paSaStateId",pgc."paSaCityId",\
          (select sc."countryName") as "countryName",\
          (select ss."stateName") as "stateName",\
          (select sc2."cityName") as "cityName",\
          concat(pgc."paSaCompanyAddress",\', \',sc."countryName",\', \',\
          ss."stateName",\', \',sc2."cityName",\', \',pgc."paSaCompanyZip") as "Address"\
          from pa_global_companies pgc left join sc_countries sc on sc.id = pgc."paSaCountryId"\
          left join sc_states ss on ss.id = pgc."paSaStateId"\
          left join sc_cities sc2 on sc2.id = pgc."paSaCityId" WHERE';
        if (search.paSaCompanyName !== null && search.paSaCompanyName !== "") {
          query +=
            ' LOWER("paSaCompanyName") like \'%' +
            search.paSaCompanyName.toLowerCase() +
            "%' and ";
        }
        if (
          search.paSaCompanyWebsite !== null &&
          search.paSaCompanyWebsite !== ""
        ) {
          query +=
            ' LOWER("paSaCompanyWebsite") like \'%' +
            search.paSaCompanyWebsite.toLowerCase() +
            "%' and ";
        }
        if (
          search.paSaPrimaryEmail !== null &&
          search.paSaPrimaryEmail !== ""
        ) {
          query +=
            ' LOWER("paSaPrimaryEmail") like \'%' +
            search.paSaPrimaryEmail.toLowerCase() +
            "%' and ";
        }
        if (search.Address !== null && search.Address !== "") {
          query +=
            ' LOWER("paSaCompanyAddress") like \'%' +
            search.Address.toLowerCase() +
            "%' or ";
          query +=
            ' LOWER(sc."countryName") like \'%' +
            search.Address.toLowerCase() +
            "%' or ";
          query +=
            ' LOWER(ss."stateName") like \'%' +
            search.Address.toLowerCase() +
            "%' or ";
          query +=
            ' LOWER(sc2."cityName") like \'%' +
            search.Address.toLowerCase() +
            "%' or ";
          query +=
            ' LOWER("paSaCompanyZip") like \'%' +
            search.Address.toLowerCase() +
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
              "select count(pa_global_companies.id) from pa_global_companies"
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

  viewPASuperAdminCompany: async (req, res) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        let query =
          'select pgc.id,pgc."paSaCompanyName",pgc."paSaFirstName",pgc."paSaLastName",\
          pgc."paSaCompanyWebsite", pgc."paSaPrimaryEmail",\
          pgc."paSaAlternateEmail",pgc."paSaPrimaryNumber",pgc."paSaAlternateNumber",pgc."paSaCompanySize",\
          pgc."paSaCompanyAddress",pgc."paSaCompanyZip",pgc."paSaCountryId",pgc.status,\
          pgc."paSaStateId",pgc."paSaCityId",\
          (select sc."countryName") as "countryName",\
          (select ss."stateName") as "stateName",\
          (select sc2."cityName") as "cityName"\
          from pa_global_companies pgc left join sc_countries sc on sc.id = pgc."paSaCountryId"\
          left join sc_states ss on ss.id = pgc."paSaStateId"\
          left join sc_cities sc2 on sc2.id = pgc."paSaCityId" where pgc.id ='+req.params.id;
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
   * @description this method will create new Super Admin Company
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
          paSaCompanyName: req.body.paSaCompanyName,
          paSaFirstName: req.body.paSaFirstName,
          paSaLastName: req.body.paSaLastName,
          paSaPrimaryEmail: req.body.paSaPrimaryEmail,
          paSaAlternateEmail: req.body.paSaAlternateEmail,
          paSaPrimaryNumber: req.body.paSaPrimaryNumber,
          paSaAlternateNumber: req.body.paSaAlternateNumber,
          paSaCompanySize: req.body.paSaCompanySize,
          paSaCompanyAddress: req.body.paSaCompanyAddress,
          paSaCountryId: req.body.paSaCountryId,
          paSaStateId: req.body.paSaStateId,
          paSaCityId: req.body.paSaCityId,
          paSaCompanyZip: req.body.paSaCompanyZip,
          paSaCompanyWebsite: req.body.paSaCompanyWebsite,
          createdPaId: req.body.createdBy,
          modifiedPaId: req.body.modifiedBy,
          status: req.body.status,
        };

        await PASuperAdmin.create(payload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the PASuperAdmin.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Super Admin Company data based on id
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
        PASuperAdmin.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Super Admin Company with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Super Admin Company with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Super Admin Company data based on id
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
        PASuperAdmin.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Super Admin Company was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Super Admin Company with id=${id}. Maybe Super Admin Company was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Super Admin Company with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Super Admin Company data based on id
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
        PASuperAdmin.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Super Admin Company was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete Super Admin Company with id=${id}. Maybe Super Admin Company was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Super Admin Company with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
