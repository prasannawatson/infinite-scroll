const db = require("../db");
var _ = require("lodash");
const SailingSchedule = require("../Admin-Models/SailingSchedule.model");
const authController = require("../Admin-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Sailing Schedule data
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
        db.query(
          `select sss."id" as "id",sss."amsCutOff" as "amsCutOff",sss."linerName",sss."vesselName",\
          sss."ETA" as "ETA",sss."portCutOff" as "portCutOff",sss."docsCutOff" as "docsCutOff",\
          sss."ETD" as "ETD",sss."linerCutOff" as "linerCutOff",sss."vgmCutOff" as "vgmCutOff",\
          sss."POL" ,sss."POD" ,\
          (select "carrierName" from sc_carriers sc where sc.id = sss."linerName") as "carrierName",\
          (select "vesselName" from sc_vessels sv where sv.id = sss."vesselName") as "VesselName",\
          concat(ss."seaPortName",'-',ss."seaPortCountry")  as "portOfLoading",\
          concat(ss2."seaPortName",'-',ss2."seaPortCountry")  as "portOfDischarge",\
          sss."status" as "status" \
          from sc_sailing_schedules sss left join sc_seaports ss on ss.id =sss."POL" join sc_seaports ss2 on ss2.id=sss."POD"`
        )
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving Sailing Schedule.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method findAndCountAll
   * @description this method will Find and Show all IncoTerm data
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
          'select sss."id" as "id",sss."amsCutOff" as "amsCutOff",sss."linerName",sss."vesselName",\
                  sss."ETA" as "ETA",sss."portCutOff" as "portCutOff",sss."docsCutOff" as "docsCutOff",\
                  sss."ETD" as "ETD",sss."linerCutOff" as "linerCutOff",sss."vgmCutOff" as "vgmCutOff",\
                  sss."POL" ,sss."POD" ,\
                  (select "seaPortCountry"  from sc_seaports ss where ss.id  = sss."POL") as "seaPortCountry",\
                  (select "carrierName" from sc_carriers sc where sc.id = sss."linerName") as "carrierName",\
                  (select "vesselName" from sc_vessels sv where sv.id = sss."vesselName") as "VesselName",\
                  (select "seaPortName" from sc_seaports ss where ss.id  = sss."POL") as "portOfLoading",\
                  (select "seaPortName" from sc_seaports ss where ss.id  = sss."POD") as "portOfDischarge",\
                  sss."status" as "status"\
                  from sc_sailing_schedules sss WHERE';
        if (search.portOfLoading !== null && search.portOfLoading !== "") {
          query +=
            ' LOWER(sc_seaports.\"seaPortName\") like \'%' +
            search.portOfLoading.toLowerCase() +
            "%' and ";
        }
        if (search.portOfDischarge !== null && search.portOfDischarge !== "") {
          query +=
            ' LOWER("incoTermDescription") like \'%' +
            search.seaPortName.toLowerCase() +
            "%' and ";
        }
        if (search.carrierName !== null && search.carrierName !== "") {
          query +=
            ' LOWER("carrierName") like \'%' +
            search.carrierName.toLowerCase() +
            "%' and ";
        }
        if (search.VesselName !== null && search.VesselName !== "") {
          query +=
            ' LOWER("vesselName") like \'%' +
            search.VesselName.toLowerCase() +
            "%' and ";
        }
        if (search.ETA !== null && search.ETA !== "") {
          query +=
            ' CAST(sss."ETA" AS VARCHAR) like \'%' +
            search.ETA.toLowerCase() +
            "%' and ";
        }
        if (search.ETD !== null && search.ETD !== "") {
          query +=
            ' CAST(sss. "ETD" AS VARCHAR) like \'%' +
            search.ETD.toLowerCase() +
            "%' and ";
        }
        query +=
          " true LIMIT " +
          req.query.limit +
          " OFFSET " +
          req.query.limit * req.query.currentPage;

        db.query(query)
          .then((data) => {
            db.query("select count(sc_incoterms.id) from sc_incoterms").then(
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



  viewSailingSchedule: async (req, res) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        db.query(
          'select sss."id" as "id",sss."amsCutOff" as "amsCutOff",sss."linerName",sss."vesselName",\
          sss."ETA" as "ETA",sss."portCutOff" as "portCutOff",sss."docsCutOff" as "docsCutOff",\
          sss."ETD" as "ETD",sss."linerCutOff" as "linerCutOff",sss."vgmCutOff" as "vgmCutOff",\
          sss."POL" ,sss."POD" ,\
          (select "carrierName" from sc_carriers sc where sc.id = sss."linerName") as "carrierName",\
          (select "vesselName" from sc_vessels sv where sv.id = sss."vesselName") as "VesselName",\
          concat(ss."seaPortName",\'-\',ss."seaPortCountry")  as "portOfLoading",\
          concat(ss2."seaPortName",\'-\',ss2."seaPortCountry")  as "portOfDischarge"\
          from sc_sailing_schedules sss left join sc_seaports ss on ss.id =sss."POL" join sc_seaports ss2 on ss2.id=sss."POD"\
          where sss.id =' + req.query.id
        )
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving Sailing Schedule.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  /**
   * @method create
   * @description this method will create new Sailing Schedule
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
          POL: req.body.POL,
          POD: req.body.POD,
          linerName: req.body.linerName,
          vesselName: req.body.vesselName,
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

        await SailingSchedule.create(payload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Sailing Schedule.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Sailing Schedule data based on id
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
        SailingSchedule.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Sailing Schedule with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Sailing Schedule with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Sailing Schedule data based on id
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
        SailingSchedule.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Sailing Schedule was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Sailing Schedule with id=${id}. Maybe Sailing Schedule was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Sailing Schedule with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Sailing Schedule data based on id
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
        SailingSchedule.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Sailing Schedule was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete Sailing Schedule with id=${id}. Maybe Sailing Schedule was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Sailing Schedule with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
