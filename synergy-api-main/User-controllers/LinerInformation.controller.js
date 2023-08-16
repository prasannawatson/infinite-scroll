const db = require("../db");
var _ = require("lodash");
const roles = require("../roles");
const LinerInformation = require("../User-Models/LinerInformation.model");
const authController = require("../User-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Liner Information data
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
        LinerInformation.findAll()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving Liner Information.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new Liner Information
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
        const payload = {
          bookingIdFk: req.body.bookingIdFk,
          linerName: req.body.linerName,
          carrierBookingNumber: req.body.carrierBookingNumber,
          vesselName: req.body.vesselName,
          voyageNumber: req.body.voyageNumber,
          serviceContract: req.body.serviceContract,
          freightTerms: req.body.freightTerms,
          movementType: req.body.movementType,
          ETA: req.body.ETA,
          ETD: req.body.ETD,
          linerCutOff: req.body.linerCutOff,
          vgmCutOff: req.body.vgmCutOff,
          portCutOff: req.body.portCutOff,
          docsCutOff: req.body.docsCutOff,
          amsCutOff: req.body.amsCutOff,
          status: req.body.status,
          createdBy: req.body.createdBy,
          modifiedBy: req.body.modifiedBy,
        };

        await LinerInformation.create(payload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Liner Information.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and show Liner Information data based on id
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
        LinerInformation.findOne({
          where: { bookingIdFk: id },
        })
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Liner Information with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Liner Information with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Liner Information data based on id
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
        LinerInformation.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Liner Information was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Liner Information with id=${id}. Maybe Liner Information was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Liner Information with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Liner Information data based on id
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
        LinerInformation.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Liener Information was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete Liner Information with id=${id}. Maybe Liner Information was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Liner Information with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getCarrierData
   * @description this method will fetch all carrier data for liner
   * @param req
   * @param res
   * @returns void
   */
  getCarrierData: async (req, res) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        db.query('select id,"carrierCode","carrierName" from sc_carriers')
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Carrier.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getCarrierData
   * @description this method will fetch all Vessels data for liner
   * @param req
   * @param res
   * @returns void
   */
  getVesselData: async (req, res) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        db.query('select id,"vesselName" from sc_vessels')
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Carrier.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getSailingSchedule
   * @description this method will fetch all Sailing Schedule data for liner
   * @param req
   * @param res
   * @returns void
   */
  getSailingSchedule: async (req, res) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        console.log(req.query.POL +" - "+req.query.POD)
        db.query(
          'select sss."id" as "id",sss."amsCutOff" as "amsCutOff",sss."linerName",sss."vesselName",\
          sss."ETA" as "ETA",sss."portCutOff" as "portCutOff",sss."docsCutOff" as "docsCutOff",\
          sss."ETD" as "ETD",sss."linerCutOff" as "linerCutOff",sss."vgmCutOff" as "vgmCutOff",\
          sss."POL" ,sss."POD" ,\
          (select "carrierName" from sc_carriers sc where sc.id = sss."linerName") as "carrierName",\
          (select "vesselName" from sc_vessels sv where sv.id = sss."vesselName") as "VesselName",\
          concat(ss."seaPortName",\'-\',ss."seaPortCountry")  as "portOfLoading",\
          concat(ss2."seaPortName",\'-\',ss2."seaPortCountry")  as "portOfDischarge",\
          sss."status" as "status" \
          from sc_sailing_schedules sss left join sc_seaports ss on ss.id =sss."POL" join sc_seaports ss2 on ss2.id=sss."POD"\
          where sss."POL" = ' +req.query.POL + 'and sss."POD" = ' +req.query.POD
        )
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Sailing Schedule.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
