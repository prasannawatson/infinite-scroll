const db = require("../db");
var _ = require("lodash");
const Currency = require("../Admin-Models/Currency.model");
const authController = require("../Admin-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Currency data
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
        Currency.findAll()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Currency.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method findAndCountAll
   * @description this method will fetch all Currency data
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
          'SELECT id, "currencyCode", "currencyROE", "currencyValidity", "currencyStatus" as status, "createdAt" FROM sc_currencies WHERE';
        if (search.currencyCode !== null && search.currencyCode !== "") {
          query +=
            ' LOWER("currencyCode") like \'%' +
            search.currencyCode.toLowerCase() +
            "%' and ";
        }
        if (search.currencyROE !== null && search.currencyROE !== "") {
          query +=
            ' CAST("currencyROE" AS VARCHAR) like \'%' +
            search.currencyROE.toLowerCase() +
            "%' and ";
        }
        if (search.currencyValidity !== null &&search.currencyValidity !== "" ) {
          query += ' LOWER("currencyValidity") like \'%' + search.currencyValidity.toLowerCase() + "%' and ";
        }

        query +=
          " true LIMIT " +
          req.query.limit +
          " OFFSET " +
          req.query.limit * req.query.currentPage;

        db.query(query)
          .then((data) => {
            db.query("select count(sc_currencies.id) from sc_currencies").then(
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

  /**
   * @method create
   * @description this method will create new Currency
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
          currencyCode: req.body.currencyCode,
          currencyROE: req.body.currencyROE,
          currencyValidity: req.body.currencyValidity,
          currencyStatus: req.body.currencyStatus,
          createdBy: req.body.createdBy,
          modifiedBy: req.body.modifiedBy,
        };

        await Currency.create(payload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Currency.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will fetch Currency data based on id
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
        Currency.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Currency with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Currency with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Currency data based on id
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
        Currency.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Currency was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Currency with id=${id}. Maybe Currency was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Currency with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Currency data based on id
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
        Currency.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Currency was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete Currency with id=${id}. Maybe Currency was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Currency with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
