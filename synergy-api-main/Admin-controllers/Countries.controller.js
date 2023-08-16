const db = require("../db");
var _ = require("lodash");
const Countries = require("../Admin-Models/Countries.model");
const authController = require("../Admin-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Countries data
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
        Countries.findAll()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving Countries.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method findAndCountAll
   * @description this method will fetch all country data
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
          'SELECT id, "countryCode", "countryName", "zoneName", "gmtOffSet", "currencyCode", "fipsCode", "isoNumeric", north, south, east, west, capital, "continentName", continent, languages, "isoAlpha3", "geoNameId", status FROM sc_countries WHERE';
        if (search.countryName !== null && search.countryName !== "") {
          query +=
            ' LOWER("countryName") like \'%' +
            search.countryName.toLowerCase() +
            "%' and ";
        }
        if (search.countryCode !== null && search.countryCode !== "") {
          query +=
            ' LOWER("countryCode") like \'%' +
            search.countryCode.toLowerCase() +
            "%' and ";
        }
        if (search.currencyCode !== null && search.currencyCode !== "") {
          query +=
            ' LOWER("currencyCode") like \'%' +
            search.currencyCode.toLowerCase() +
            "%' and ";
        }
        if (search.fipsCode !== null && search.fipsCode !== "") {
          query +=
            ' LOWER("fipsCode") like \'%' +
            search.fipsCode.toLowerCase() +
            "%' and ";
        }
        if (search.continentName !== null && search.continentName !== "") {
          query +=
            ' LOWER("continentName") like \'%' +
            search.continentName.toLowerCase() +
            "%' and ";
        }
        query +=
          " true LIMIT " +
          req.query.limit +
          " OFFSET " +
          req.query.limit * req.query.currentPage;

        db.query(query)
          .then((data) => {
            db.query("select count(sc_countries.id) from sc_countries").then(
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
                err.message || "Some error occurred while retrieving Charges.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },





  viewAllCountries: async (req, res) => {
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
        'SELECT id, "countryCode","countryName", "zoneName",  "gmtOffSet", "currencyCode", \
        "fipsCode", "isoNumeric",north, south, east, west,capital, "continentName", \
        continent, languages,  "isoAlpha3", "geoNameId" FROM sc_countries sc where  sc.id =' +req.params.id;
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
   * @description this method will create new Countries
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
        const CountriesPayload = {
          countryCode: req.body.countryCode,
          countryName: req.body.countryName,
          continentName: req.body.continentName,
          continent: req.body.continent,
          currencyCode: req.body.currencyCode,
          languages: req.body.languages,
          capital: req.body.capital,
          north: req.body.north,
          south: req.body.south,
          east: req.body.east,
          west: req.body.west,
          fipsCode: req.body.fipsCode,
          isoNumeric: req.body.isoNumeric,
          isoAlpha3: req.body.isoAlpha3,
          geoNameId: req.body.geoNameId,
          zoneName: req.body.zoneName,
          gmtOffSet: req.body.gmtOffSet,
          status: req.body.status,
          createdBy: req.body.createdBy,
          modifiedBy: req.body.modifiedBy,
        };
        await Countries.create(CountriesPayload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Countries.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will fetch Countries data based on id
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
        Countries.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Countries with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Countries with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Countries data based on id
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
        Countries.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Countries was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Countries with id=${id}. Maybe Countries was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Countries with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Countries data based on id
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
        Countries.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Countries was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete Countries with id=${id}. Maybe Countries was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Countries with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getState
   * @description this method will fetch State data based on id
   * @param req
   * @param res
   * @returns void
   */
  getState: async (req, res, next) => {
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
        db.query('select * from sc_states where sc_states."countryId"='+id)
          .then((data) => {
            if (data) {
              res.send(data[0]);
            } else {
              res.status(404).send({
                message: `Cannot find Countries with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Countries with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getCity
   * @description this method will fetch City data based on id
   * @param req
   * @param res
   * @returns void
   */
  getCity: async (req, res, next) => {
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
        db.query('select * from sc_cities sc where sc."stateId"='+id)
          .then((data) => {
            if (data) {
              res.send(data[0]);
            } else {
              res.status(404).send({
                message: `Cannot find Countries with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Countries with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
