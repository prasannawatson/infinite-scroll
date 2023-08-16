const db = require("../db");
var _ = require("lodash");
const GateOut = require("../User-Models/GateOut.model");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Gate Out
   * @param req
   * @param res
   * @returns void
   */
  getAll: async (req, res) => {
    try {
      GateOut.findAll()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while retrieving GateOut details.",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new GateOut details
   * @param req
   * @param res
   * @returns void
   */
  create: async (req, res) => {
    try {
      const id = req.body.containerType;
      const payload = {
        id: req.body.id,
        fclExportBookingNo: req.body.bookingId,
        fclExportContainerNameFk: req.body.containerType,
        containerNumber: req.body.containerNumber,
        terminalName: req.body.terminalName,
        gateOutDate: req.body.gateOutDate,
        status: req.body.status,
        createdBy: req.body.createdBy,
        modifiedBy: req.body.modifiedBy,
      };

      await GateOut.create(payload)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the GateOut details.",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show GateOut details based on id
   * @param req
   * @param res
   * @returns void
   */
  find: async (req, res, next) => {
    try {
      const id = req.params.id;
      GateOut.findAll({
        where: { id: id },
      })
        .then((data) => {
          if (data) {
            res.send(data[0]);
          } else {
            res.status(404).send({
              message: `Cannot find GateOut details with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error retrieving GateOut details with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update GateOut details data based on id
   * @param req
   * @param res
   * @returns void
   */
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      GateOut.update(req.body, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "GateOut details was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update GateOut details with id=${id}. Maybe GateOut details was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating GateOut details with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete GateOut details data based on id
   * @param req
   * @param res
   * @returns void
   */
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      GateOut.destroy({
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "GateOut details was deleted successfully!",
            });
          } else {
            res.send({
              message: `Cannot delete GateOut details with id=${id}. Maybe GateOut details was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Could not delete GateOut details with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },
};
