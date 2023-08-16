const db = require("../db");
var _ = require("lodash");
const airPort = require("../Admin-Models/AirPorts.model");
const authController = require("../Admin-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Air-Port data
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
        airPort
          .findAll()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving airPort.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getAll
   * @description this method will fetch all Air-Port data
   * @param req
   * @param res
   * @returns void
   */
  getAllForQuote: async (req, res) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        airPort
          db.query('select sa.id, sa."airPortCode" as "seaPortCode", sa."airPortName" as "seaPortName", sa."airPortCountryName" as "seaPortCountry"\
          from sc_airports sa order by id asc')
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving airPort.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method findAndCountAll
   * @description this method will Find and Show all Seaport data
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
          'select sa.id, sa."airPortCode", sa."airPortName", sa."airPortCountryName", sa."airPortCountryCode", \
          sa.status from sc_airports sa WHERE';
        if (search.airPortCode !== null && search.airPortCode !== "") {
            query +=' LOWER(sa."airPortCode") like \'%' +search.airPortCode.toLowerCase() +"%' and ";
        }
        if (search.airPortName !== null && search.airPortName !== "") {
            query +=' LOWER(sa."airPortName") like \'%' +search.airPortName.toLowerCase() +"%' and ";
        }
        if (search.airPortCountryCode !== null && search.airPortCountryCode !== "") {
            query +=' LOWER(sa."airPortCountryCode") like \'%' +search.airPortCountryCode.toLowerCase() +"%' and ";
        }
        if (search.airPortCountryName !== null &&search.airPortCountryName !== "") {
            query +=' LOWER(sa."airPortCountryName") like \'%' +search.airPortCountryName.toLowerCase() +"%' and ";
        }
        query +=" true LIMIT " +req.query.limit +" OFFSET " +req.query.limit * req.query.currentPage;
        db.query(query)
          .then((data) => {
            db.query("select count(sc_airports.id) from sc_airports").then(
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
   * @description this method will create new SeaPort
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
          airPortCode: req.body.airPortCode,
          airPortName: req.body.airPortName,
          airPortCountryCode: req.body.airPortCountryCode,
          airPortCountryName: req.body.airPortCountryName,
          status: req.body.status,
          createdBy: req.body.createdBy,
          modifiedBy: req.body.modifiedBy,
        };

        await airPort
          .create(payload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the airPort.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Air-Port data based on id
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
        airPort
          .findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find SeaPort with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving SeaPort with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Air-Port data based on id
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
        airPort
          .update(req.body, {
            where: { id: id },
          })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "SeaPort was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update SeaPort with id=${id}. Maybe SeaPort was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating SeaPort with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Air-Port data based on id
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
        airPort
          .destroy({
            where: { id: id },
          })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "SeaPort was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete SeaPort with id=${id}. Maybe SeaPort was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete SeaPort with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
