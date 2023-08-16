const db = require("../db");
var _ = require("lodash");
const airQuoteNotes = require("../Admin-Models/AirQuoteNotes.model");
const authController = require("../Admin-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Container data
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
        airQuoteNotes.findAll()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving Air Quote Notes.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method findAndCountAll
   * @description this method will fetch and show all container data
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
          'SELECT id, "containerName", "maxKG", "maxCBM", status FROM sc_containers WHERE';
        if (search.containerName !== null && search.containerName !== "") {
          query +=
            ' LOWER("containerName") like \'%' +
            search.containerName.toLowerCase() +
            "%' and ";
        }
        if (search.maxKG !== null && search.maxKG !== "") {
          query +=
            ' CAST("maxKG" AS VARCHAR) like \'%' + search.maxKG + "%' and ";
        }
        if (search.maxCBM !== null && search.maxCBM !== "") {
          query +=
            ' CAST("maxCBM" AS VARCHAR) like \'%' + search.maxCBM + "%' and ";
        }

        query +=
          " true LIMIT " +
          req.query.limit +
          " OFFSET " +
          req.query.limit * req.query.currentPage;

        db.query(query)
          .then((data) => {
            db.query("select count(sc_containers.id) from sc_containers").then(
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
   * @description this method will create new Container
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
        let payload = JSON.parse(
          JSON.stringify(req.body)
        );
        await airQuoteNotes.bulkCreate(payload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            console.log(err)
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Air Quote Notes.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will fetch Container data based on id
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
        airQuoteNotes.findAll({where:{quoteId:id}})
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Container with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Container with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Container data based on id
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
        let charges = req.body;
              charges = charges;
              charges.map((item) => {
                item.quoteId = id;
              });
              const oldRecords = charges.filter((item) => {
                return item?.id > 0;
              });
              const newRecords = charges.filter((item) => {
                return typeof item?.id === "undefined";
              });
              oldRecords.forEach((oldRecord) => {
                airQuoteNotes.update(oldRecord, {
                  where: { id: oldRecord.id },
                });
              });
              airQuoteNotes.bulkCreate(newRecords)
              .then((num) => {
            if (num == 1) {
              res.send({
                message: "Notes was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Container with id=${id}. Maybe Container was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            console.log(err)
            res.status(500).send({
              message: "Error updating Container with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Container data based on id
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
        airQuoteNotes.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Container was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete Container with id=${id}. Maybe Container was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Container with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
