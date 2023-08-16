const db = require("../db");
var _ = require("lodash");
const bookingHistory = require("../User-Models/FclBookingHistory.model");
const authController = require("../User-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Full Container Load(FCL)-bookingHistory data
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
        bookingHistory
          .findAll()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving bookingHistory.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new Full Container Load(FCL)-bookingHistory
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
          currencyCode: req.body.currencyCode,
          currencyROE: req.body.currencyROE,
          currencyValidity: req.body.currencyValidity,
          currencyStatus: req.body.currencyStatus,
          createdBy: req.body.createdBy,
          modifiedBy: req.body.modifiedBy,
        };

        await bookingHistory
          .create(payload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the bookingHistory.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Full Container Load(FCL)-bookingHistory data based on id
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
        bookingHistory
          .findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find bookingHistory with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving bookingHistory with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Full Container Load(FCL)-bookingHistory data based on id
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
        bookingHistory
          .update(req.body, {
            where: { id: id },
          })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "bookingHistory was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update bookingHistory with id=${id}. Maybe bookingHistory was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating bookingHistory with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Full Container Load(FCL)-bookingHistory data based on id
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
        bookingHistory
          .destroy({
            where: { id: id },
          })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "bookingHistory was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete bookingHistory with id=${id}. Maybe bookingHistory was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete bookingHistory with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
