const db = require("../db");
var _ = require("lodash");
const roles = require("../roles");
const partyInfo = require("../User-Models/PartyInfo.model");
const authController = require("../User-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Party Info data
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
        partyInfo
          .findAll()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving Party Info.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new Party Info
   * @param req
   * @param res
   * @returns void
   */
  create: async (req, res) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.createFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const partyInfoPayload = {
          bookingIdFk: req.body.bookingIdFK,
          prepaidName: req.body.prepaidName,
          prepaidAddress: req.body.prepaidAddress,
          collectName: req.body.collectName,
          collectAddress: req.body.collectAddress,
          createdBy: req.body.createdBy,
          modifiedBy: req.body.modifiedBy,
        };
        await partyInfo
          .create(partyInfoPayload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Party Info.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Party Info data based on id
   * @param req
   * @param res
   * @returns void
   */
  find: async (req, res, next) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        partyInfo
          .findOne({
            where: { bookingIdFk: id },
          })
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Party Info with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Party Info with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Party Info data based on id
   * @param req
   * @param res
   * @returns void
   */
  update: async (req, res, next) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.editFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        partyInfo
          .update(req.body, {
            where: { id: id },
          })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Party Info was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Party Info with id=${id}. Maybe Party Info was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Party Info with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Party Info data based on id
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
        partyInfo
          .destroy({
            where: { id: id },
          })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Party Info was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete Party Info with id=${id}. Maybe Party Info was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Party Info with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
