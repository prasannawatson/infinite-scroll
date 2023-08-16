const db = require("../db");
var _ = require("lodash");
const GateIn = require("../User-Models/GateIn.model");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all GateIn
   * @param req
   * @param res
   * @returns void
   */
  getAll: async (req, res) => {
    try {
      GateIn.findAll()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while retrieving GateIn details.",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new GateIn details
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
        gateInDate: req.body.gateInDate,
        status: req.body.status,
        createdBy: req.body.createdBy,
        modifiedBy: req.body.modifiedBy,
      };

      await GateIn.create(payload)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the GateIn details.",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show GateIn details based on id
   * @param req
   * @param res
   * @returns void
   */
  find: async (req, res, next) => {
    try {
      const id = req.params.id;
      GateIn.findAll({
        where: { id: id },
      })
        .then((data) => {
          if (data) {
            res.send(data[0]);
          } else {
            res.status(404).send({
              message: `Cannot find GateIn details with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error retrieving GateIn details with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update GateIn details data based on id
   * @param req
   * @param res
   * @returns void
   */
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      GateIn.update(req.body, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "GateIn details was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update GateIn details with id=${id}. Maybe GateIn details was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating GateIn details with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete GateIn details data based on id
   * @param req
   * @param res
   * @returns void
   */
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      GateIn.destroy({
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "GateIn details was deleted successfully!",
            });
          } else {
            res.send({
              message: `Cannot delete GateIn details with id=${id}. Maybe GateIn details was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Could not delete GateIn details with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },
};
