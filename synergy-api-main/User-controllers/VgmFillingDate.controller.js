const db = require("../db");
var _ = require("lodash");
const VGMFilling = require("../User-Models/VgmFilling.model");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Verified Gross Mass-Filling date
   * @param req
   * @param res
   * @returns void
   */
  getAll: async (req, res) => {
    try {
      VGMFilling.findAll()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while retrieving VGMFilling Date details.",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new Verified Gross Mass-Filling Date details
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
        vgmFillingDate: req.body.vgmFillingDate,
        status: req.body.status,
        createdBy: req.body.createdBy,
        modifiedBy: req.body.modifiedBy,
      };

      await VGMFilling.create(payload)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the VGMFilling Date details.",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show
   * Verified Gross Mass-Filling date details based on id
   * @param req
   * @param res
   * @returns void
   */
  find: async (req, res, next) => {
    try {
      const id = req.params.id;
      VGMFilling.findAll({
        where: { id: id },
      })
        .then((data) => {
          if (data) {
            res.send(data[0]);
          } else {
            res.status(404).send({
              message: `Cannot find VGMFilling Date details with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error retrieving VGMFilling Date details with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Verified Gross Mass-Filling Date details data based on id
   * @param req
   * @param res
   * @returns void
   */
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      VGMFilling.update(req.body, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "VGMFilling Date details was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update VGMFilling Date details with id=${id}. Maybe VGMFilling Date details was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating VGMFilling Date details with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Verified Gross Mass-Filling Date details data based on id
   * @param req
   * @param res
   * @returns void
   */
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      VGMFilling.destroy({
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "VGMFilling Date details was deleted successfully!",
            });
          } else {
            res.send({
              message: `Cannot delete VGMFilling Date details with id=${id}. Maybe VGMFilling Date details was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Could not delete VGMFilling Date details with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },
};
