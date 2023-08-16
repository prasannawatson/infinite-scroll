const db = require("../db");
var _ = require("lodash");
const roles = require("../roles");
const FclExportBookingContainerDetails = require("../User-Models/FclExportBookingContainerDetails.model");
const FclExportBooking = require("../User-Models/FclExportBooking.model");
const authController = require("../User-controllers/auth");
const FclExportBookingContainer = require("../User-Models/FclExportBookingContainer.model");
const Sequelize = require("sequelize");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all
   * Full Container Load(FCL)-ExportBookingContainerDetails data
   * @param req
   * @param res
   * @returns void
   */
  getAll: async (req, res) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        db.query(
          'select \
        sc."id" as "containerId",\
        sc."containerName" as "containerName",\
        spt."packageName" as "packageName",\
        sfebcd ."id" as "id",\
        sfebcd ."fclExportBookingNo" as "fclExportBookingNo",\
        sfebcd ."fclContainerNo" as "fclContainerNo",\
        sfebcd ."fclPieces" as "fclPieces",\
        sfebcd ."fclWeightLbs" as "fclWeightLbs",\
        sfebcd ."fclWeightKgs" as "fclWeightKgs",\
        sfebcd ."fclCft" as "fclCft",\
        sfebcd ."fclCbm" as "fclCbm",\
        sfebcd ."fclSealNo" as "fclSealNo",\
        sfebcd ."fclContainerTypeFk" as "fclContainerTypeFk"\
        from sc_fcl_export_booking_container_details sfebcd \
        left join sc_fcl_export_booking_containers sfebc on sfebc."id"  = sfebcd."fclContainerTypeFk"\
        left join sc_containers sc on sc."id"  = sfebc."fclExportContainerNameFk"\
        left join sc_package_tbls spt on spt."id"  = sfebcd."fclPackageTypeFk"\
        where sfebcd ."fclExportBookingNo" = ' +
            req.query.bookingId +
            ""
        )
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving Fcl Export Booking Containers.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getAllForTable
   * @description this method will fetch all
   * Full Container Load(FCL)-ExportBookingContainerDetails data for Table
   * @param req
   * @param res
   * @returns void
   */
  getAllForTable: async (req, res) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const search = JSON.parse(req.query.search);
        let query =
          'select \
        sc."id" as "containerId",\
        sc."containerName" as "containerName",\
        spt."packageName" as "packageName",\
        sfebcd ."id" as "id",\
        sfebcd ."fclExportBookingNo" as "fclExportBookingNo",\
        sfebcd ."fclContainerNo" as "fclContainerNo",\
        sfebcd ."fclPieces" as "fclPieces",\
        sfebcd ."fclWeightLbs" as "fclWeightLbs",\
        sfebcd ."fclWeightKgs" as "fclWeightKgs",\
        sfebcd ."fclCft" as "fclCft",\
        sfebcd ."fclCbm" as "fclCbm",\
        sfebcd ."fclSealNo" as "fclSealNo",\
        sfebcd ."fclContainerTypeFk" as "fclContainerTypeFk"\
        from sc_fcl_export_booking_container_details sfebcd \
        left join sc_fcl_export_booking_containers sfebc on sfebc."id"  = sfebcd."fclContainerTypeFk"\
        left join sc_containers sc on sc."id"  = sfebc."fclExportContainerNameFk"\
        left join sc_package_tbls spt on spt."id"  = sfebcd."fclPackageTypeFk"\
        where sfebcd ."fclExportBookingNo" = ' +
          req.query.bookingId +
          "and";
        if (search.containerName !== null && search.containerName !== "") {
          query +=
            ' LOWER(sc."containerName") like \'%' +
            search.containerName.toLowerCase() +
            "%' and ";
        }
        if (search.fclContainerNo !== null && search.fclContainerNo !== "") {
          query +=
            ' LOWER(sfebcd."fclContainerNo") like \'%' +
            search.fclContainerNo.toLowerCase() +
            "%' and ";
        }
        if (search.fclSealNo !== null && search.fclSealNo !== "") {
          query +=
            ' CAST(sfebcd."fclSealNo" AS VARCHAR) like \'%' +
            search.fclSealNo.toLowerCase() +
            "%' and ";
        }
        if (search.fclPieces !== null && search.fclPieces !== "") {
          query +=
            ' CAST(sfebcd."fclPieces" AS VARCHAR) like \'%' +
            search.fclPieces +
            "%' and ";
        }
        if (search.fclWeightKgs !== null && search.fclWeightKgs !== "") {
          query +=
            ' CAST(sfebcd."fclWeightKgs" AS VARCHAR) like \'%' +
            search.fclWeightKgs +
            "%' and ";
        }
        if (search.fclWeightLbs !== null && search.fclWeightLbs !== "") {
          query +=
            ' CAST(sfebcd."fclWeightLbs" AS VARCHAR) like \'%' +
            search.fclWeightLbs +
            "%' and ";
        }
        if (search.fclCft !== null && search.fclCft !== "") {
          query +=
            ' CAST(sfebcd."fclCft" AS VARCHAR) like \'%' +
            search.fclCft +
            "%' and ";
        }
        if (search.fclCbm !== null && search.fclCbm !== "") {
          query +=
            ' CAST(sfebcd."fclCbm" AS VARCHAR) like \'%' +
            search.fclCbm +
            "%' and ";
        }
        if (search.packageName !== null && search.packageName !== "") {
          query +=
            ' LOWER(spt."packageName") like \'%' +
            search.packageName.toLowerCase() +
            "%' and ";
        }
        query +=
          " true LIMIT " +
          req.query.limit +
          " OFFSET " +
          req.query.limit * req.query.currentPage;
        db.query(query)
          .then((data) => {
            db.query(
              `select count(sc_fcl_export_booking_container_details.id) from sc_fcl_export_booking_container_details where\
              sc_fcl_export_booking_container_details."fclExportBookingNo"=` +
                req.query.bookingId
            ).then((count) => {
              const response = {
                count: count[0][0].count,
                data: data[0],
                currentPage: req.query.currentPage,
                limit: req.query.limit,
              };
              res.send(response);
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving Fcl Export Booking Containers.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new
   * Full Container Load(FCL)-ExportBookingContainerDetails
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
          id: req.body.id,
          fclExportBookingNo: req.body.fclExportBookingNo,
          fclContainerNo: req.body.fclContainerNo,
          fclSealNo: req.body.fclSealNo,
          fclContainerTypeFk: req.body.fclContainerTypeFk,
          fclPieces: req.body.fclPieces,
          fclPackageTypeFk: req.body.packageType,
          fclWeightLbs: req.body.fclWeightLbs,
          fclWeightKgs: req.body.fclWeightKgs,
          fclCft: req.body.fclCft,
          fclCbm: req.body.fclCbm,
          fclContainerStatus: req.body.fclContainerStatus,
        };
        await FclExportBookingContainerDetails.create(payload)
          .then((data) => {
            FclExportBookingContainer.update(req.body.selectedContainer, {
              where: { id: req.body.selectedContainer.id },
            }).then(() => {
              db.query(
                'select \
                sum(sfebcd."fclWeightLbs") as "fclExportWeightLbs",\
                sum(sfebcd."fclWeightKgs") as "fclExportWeightKgs",\
                sum(sfebcd."fclCft") as "fclExportCft",\
                sum(sfebcd."fclCbm") as "fclExportCbm",\
                sum(sfebcd."fclPieces") as "fclExportPiecesCount"\
                from sc_fcl_export_booking_container_details sfebcd where "fclExportBookingNo" = ' +
                  req.body.fclExportBookingNo +
                  "\
              "
              ).then((res) => {
                const vals = res[0][0];
                console.log(vals);
                console.log(req.body.fclExportBookingNo);
                FclExportBooking.update(vals, {
                  where: { id: req.body.fclExportBookingNo },
                }).then((res) => {
                  console.log("Updated");
                });
              });
            });
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Fcl Export Booking.",
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
   * Full Container Load(FCL)-ExportBookingContainerDetails
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
        FclExportBookingContainerDetails.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Fcl Export Booking with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Fcl Export Booking with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update
   * Full Container Load(FCL)-ExportBookingContainerDetails data based on id
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
        FclExportBookingContainerDetails.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              console.log("Successfull");
              res.send({
                message: "Fcl Export Booking was updated successfully.",
              });
            } else {
              console.log("fail");
              res.send({
                message: `Cannot update Fcl Export Booking with id=${id}. Maybe Fcl Export Booking was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Fcl Export Booking with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete
   * Full Container Load(FCL)-ExportBookingContainerDetails data based on id
   * @param req
   * @param res
   * @returns void
   */
  delete: async (req, res, next) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.deleteFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        FclExportBookingContainerDetails.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              console.log(req.body.fclExportBookingNo);
              FclExportBookingContainer.update(req.body.selectedContainer, {
                where: { id: req.body.selectedContainer.id },
              }).then(() => {
                db.query(
                  'select \
                  COALESCE(sum(sfebcd."fclWeightLbs"), 0) as "fclExportWeightLbs",\
                  COALESCE(sum(sfebcd."fclWeightKgs"), 0) as "fclExportWeightKgs",\
                  COALESCE(sum(sfebcd."fclCft"), 0) as "fclExportCft",\
                  COALESCE(sum(sfebcd."fclCbm"), 0) as "fclExportCbm",\
                  COALESCE(sum(sfebcd."fclPieces"), 0) as "fclExportPiecesCount"\
                  from sc_fcl_export_booking_container_details sfebcd where "fclExportBookingNo" = ' +
                    req.body.fclExportBookingNo +
                    "\
                "
                ).then((res) => {
                  const vals = res[0][0];
                  console.log(vals);
                  FclExportBooking.update(vals, {
                    where: { id: req.body.fclExportBookingNo },
                  }).then((res) => {
                    console.log("Updated");
                  });
                });
              });
              res.send({
                message: "Fcl Export Booking was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete Fcl Export Booking with id=${id}. Maybe Fcl Export Booking was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Fcl Export Booking with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
