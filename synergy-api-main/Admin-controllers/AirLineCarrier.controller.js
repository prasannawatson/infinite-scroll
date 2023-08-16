const db = require("../db");
var _ = require("lodash");
const airLineCarrier = require("../Admin-Models/AirlineCarrier.model");
const authController = require('../Admin-controllers/auth');

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Air Line Carrier data
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
        airLineCarrier.findAll()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving airLineCarrier.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method findAndCountAll
   * @description this method will fetch all Carrier data
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
      }
      else {
        const search = JSON.parse(req.query.search)
        let query = 'SELECT id, "airLineName", "iataDesignator", "digitCode", "icaoCode",\
        "airLineCountry","status" FROM sc_airline_carriers WHERE';
        if (search.airLineName !== null && search.airLineName !== '') {
          query += " LOWER(\"airLineName\") like '%" + search.airLineName.toLowerCase() + "%' and "
        }
        if (search.digitCode !== null && search.digitCode !== '') {
            query += " CAST(\"digitCode\" AS VARCHAR) like '%" + search.digitCode + "%' and "
        }
        if (search.icaoCode !== null && search.icaoCode !== '') {
            query += " LOWER(\"icaoCode\") like '%" + search.icaoCode.toLowerCase() + "%' and "
          }
        if (search.airLineCountry !== null && search.airLineCountry !== '') {
            query += " LOWER(\"airLineCountry\") like '%" + search.airLineCountry.toLowerCase() + "%' and "
          }
        if (search.iataDesignator !== null && search.iataDesignator !== '') {
          query += " LOWER(\"iataDesignator\") like '%" + search.iataDesignator.toLowerCase() + "%' and "
        }
        query += " true LIMIT " + req.query.limit + " OFFSET " +req.query.limit * req.query.currentPage;
        db.query(query)
          .then((data) => {
            db.query(
              "select count(sc_airline_carriers.id) from sc_airline_carriers"
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
                err.message ||
                "Some error occurred while retrieving Air Line Carrier.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new Air Line Carrier
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
        const airLineCarrier = {
            airLineName:req.body.airLineName,
            iataDesignator:req.body.iataDesignator,
            digitCode:req.body.digitCode,
            icaoCode:req.body.icaoCode,
            airLineCountry:req.body.airLineCountry,
            status:req.body.status,
            createdBy: req.body.createdBy,
            modifiedBy: req.body.modifiedBy,
        };
        await airLineCarrier.create(airLineCarrier)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the airLineCarrier.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will fetch Air Line Carrier data based on id
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
        airLineCarrier.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Air Line Carrier with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Air Line Carrier with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Air Line Carrier data based on id
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
        airLineCarrier.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Air Line Carrier was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Air Line Carrier with id=${id}. Maybe Air Line Carrier was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Air Line Carrier with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Air Line Carrier data based on id
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
        airLineCarrier.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Air Line Carrier was deleted successfully!",
              });
            } else {
              res.send({
                message: `Air Line Cannot delete Carrier with id=${id}. Maybe Carrier was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Air Line Carrier with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
