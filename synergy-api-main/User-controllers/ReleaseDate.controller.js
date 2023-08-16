const db = require("../db");
var _ = require("lodash");
const ReleaseDate = require("../User-Models/ReleaseDate.model");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all ReleaseDate
   * @param req
   * @param res
   * @returns void
   */
  getAll: async (req, res) => {
    try {
      ReleaseDate.findAll()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while retrieving ReleaseDate details.",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new ReleaseDate details
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
        fclExportContainerNameFk: req.body.containerList,
        releaseDate: req.body.releaseDate,
        status: req.body.status,
        createdBy: req.body.createdBy,
        modifiedBy: req.body.modifiedBy,
      };

      await ReleaseDate.create(payload)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the ReleaseDate details.",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show ReleaseDate details based on id
   * @param req
   * @param res
   * @returns void
   */
  find: async (req, res, next) => {
    try {
      const id = req.params.id;
      ReleaseDate.findAll({
        where: { id: id },
      })
        .then((data) => {
          if (data) {
            res.send(data[0]);
          } else {
            res.status(404).send({
              message: `Cannot find ReleaseDate details with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error retrieving ReleaseDate details with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update ReleaseDate details data based on id
   * @param req
   * @param res
   * @returns void
   */
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      ReleaseDate.update(req.body, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "ReleaseDate details was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update ReleaseDate details with id=${id}. Maybe ReleaseDate details was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating ReleaseDate details with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete ReleaseDate details data based on id
   * @param req
   * @param res
   * @returns void
   */
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      ReleaseDate.destroy({
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "ReleaseDate details was deleted successfully!",
            });
          } else {
            res.send({
              message: `Cannot delete ReleaseDate details with id=${id}. Maybe ReleaseDate details was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Could not delete ReleaseDate details with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },
};
