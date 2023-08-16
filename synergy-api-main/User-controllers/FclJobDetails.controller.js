const db = require("../db");
var _ = require("lodash");
const roles = require("../roles");
const fclJobDetails = require("../User-Models/FclJobDetails.model");
const fclJobAttachment = require("../User-Models/FclJobAttachment.model");
const authController = require("../User-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Full Container Load(FCL)-JobDetails data
   * @param req
   * @param res
   * @returns void
   */
  getAll: async (req, res) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclJob).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const search = JSON.parse(req.query.search);
        let query = `select sfjd."id" as "id",\
                    sfjd ."id" as "fclJobNum",\
                    sfjd ."fclJobMbl" as "fclJobMbl",\
                    sfjd."fclExpBookingId" as "fclExpBookingId",\
                    (select sc2."customerName") as "fclJobCustomer",\
                    (select sc3."customerName") as "fclJobAgent",\
                    concat(ss."seaPortName",'-',ss."seaPortCountry") as "fclJobPol",\
                    concat(ss2."seaPortName",'-',ss2."seaPortCountry") as "fclJobPod",\
                    concat(ss3."seaPortName",'-',ss3."seaPortCountry") as "fclJobPor",\
                    concat(ss4."seaPortName",'-',ss4."seaPortCountry") as "fclJobPodischarge",\
                    (select sc."carrierName" from sc_carriers sc where sc.id=sfjd."fclJobCarrier") as "fclJobCarrier",\
                    (select sv."vesselName") as "fclJobVessel",\
                    sfjd."fclJobStatus" as "fclJobStatus"\
                     from sc_fcl_job_details sfjd left join sc_customers sc2 on sc2.id =sfjd."fclJobAgent" \
                     join sc_customers sc3 on sc3.id =sfjd."fclJobAgent" \
                     join sc_seaports ss on ss.id = sfjd."fclJobPol"\
                     join sc_seaports ss2 on ss2.id = sfjd."fclJobPod" \
                     join sc_seaports ss3 on ss3.id = sfjd."fclJobPor"\
                     join sc_seaports ss4 on ss4.id = sfjd."fclJobPodischarge"\
                     join sc_vessels sv on sv.id = sfjd."fclJobVessel" WHERE`;
        if (search.fclJobAgent !== null && search.fclJobAgent !== "") {
          query +=
            ' LOWER(sc3."customerName") like \'%' +
            search.fclJobAgent.toLowerCase() +
            "%' and ";
        }
        if (search.fclJobVessel !== null && search.fclJobVessel !== "") {
          query +=
            ' LOWER(sv."vesselName") like \'%' +
            search.fclJobVessel.toLowerCase() +
            "%' and ";
        }
        if (search.fclJobPol !== null && search.fclJobPol !== "") {
          query +=
            ' LOWER(ss."seaPortName") like \'%' +
            search.fclJobPol.toLowerCase() +
            "%' and ";
        }
        query +=
          " true LIMIT " +
          req.query.limit +
          " OFFSET " +
          req.query.limit * req.query.currentPage;
        db.query(query)
          .then((data) => {
            db.query("select count(sfjd.id) from sc_fcl_job_details sfjd").then(
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
                err.message ||
                "Some error occurred while retrieving Fcl Export Booking.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new Full Container Load(FCL)-JobDetails
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
          fclJobNum: req.body.fclJobNum,
          fclExpBookingId: req.body.fclExpBookingId,
          fclJobDate: req.body.fclJobDate,
          fclJobMbl: req.body.fclJobMbl,
          fclJobMblDate: req.body.fclJobMblDate,
          fclJobAgent: req.body.fclJobAgent,
          fclJobAgentAddress: req.body.fclJobAgentAddress,
          fclJobBlType: req.body.fclJobBlType,
          fclJobFt: req.body.fclJobFt,
          fclJobDm: req.body.fclJobDm,
          fclJobPor: req.body.fclJobPor,
          fclJobPol: req.body.fclJobPol,
          fclJobPodischarge: req.body.fclJobPodischarge,
          fclJobPod: req.body.fclJobPod,
          fclJobEtd: req.body.fclJobEtd,
          fclJobEta: req.body.fclJobEta,
          fclJobAtd: req.body.fclJobAtd,
          fclJobAta: req.body.fclJobAta,
          fclJobCarrier: req.body.fclJobCarrier,
          fclJobVessel: req.body.fclJobVessel,
          fclJobVoyage: req.body.fclJobVoyage,
          fclJobMove: req.body.fclJobMove,
          fclJobNotes: req.body.fclJobNotes,
          fclJobStatus: req.body.fclJobStatus,
        };

        await fclJobDetails
          .create(payload)
          .then((data) => {
            const attachmentPayload = {
              fclJobDetailsId: data.id,
              fclJobBookingId: req.body.fclExpBookingId,
            };
            fclJobAttachment.create(attachmentPayload).then(() => {
              console.log("Attachment added");
            });
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the fclJobDetails.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show
   * Full Container Load(FCL)-JobDetails data based on id
   * @param req
   * @param res
   * @returns void
   */
  find: async (req, res, next) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclJob).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        fclJobDetails
          .findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find fclJobDetails with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving fclJobDetails with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Full Container Load(FCL)-JobDetails data based on id
   * @param req
   * @param res
   * @returns void
   */
  update: async (req, res, next) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.editFclJob).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        fclJobDetails
          .update(req.body, {
            where: { id: id },
          })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "fclJobDetails was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update fclJobDetails with id=${id}. Maybe fclJobDetails was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating fclJobDetails with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Full Container Load(FCL)-JobDetails data based on id
   * @param req
   * @param res
   * @returns void
   */
  delete: async (req, res, next) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.deleteFclJob).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        fclJobDetails
          .destroy({
            where: { id: id },
          })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "fclJobDetails was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete fclJobDetails with id=${id}. Maybe fclJobDetails was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete fclJobDetails with id=" + id,
            });
          });
      }
    }
     catch (error) {
      console.log(error.message);
    }
  },
};
