const db = require("../db");
var _ = require("lodash");
const roles = require("../roles");
const authController = require('../User-controllers/auth');
const FclExportBookingContainer = require("../User-Models/FclExportBookingContainer.model");

module.exports = {
    /**
     * @method getAll
     * @description this method will fetch all Full Container Load(FCL)-ExportBookingContainer 
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
                db.query(' select \
                    sfebc.id as "id",\
                    sfebc."fclExportBookingNo" as "fclExportBookingNo" ,\
                    sfebc."fclExportContainerNameFk" as "fclExportContainerNameFk" ,\
                    sfebc."fclTotalContainersCount" as "fclTotalContainersCount" ,\
                    sfebc."fclExportContainerCount" as "fclExportContainerCount",\
                    sc."containerName" as "fclExportContainerName",\
                    sc."id" as "fclExportContainerId"\
                    from sc_fcl_export_booking_containers sfebc \
                    join sc_containers sc on sc."id" = sfebc ."fclExportContainerNameFk" \
                    where sfebc ."fclExportBookingNo" = (:bookingId)', {
                    replacements: {bookingId: req.query.bookingId},
                })
                .then((data) => {
                    res.send(data[0]);
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving Charges.",
                    });
                });
        } 
    }catch (error) {
            console.log(error.message);
        }
    },

    /**
     * @method create
     * @description this method will create new Full Container Load(FCL)-ExportBookingContainer 
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
                fclExportContainerNameFk: req.body.fclExportContainerNameFk,
                fclTotalContainersCount: req.body.fclTotalContainersCount,
                fclExportContainerCount: req.body.fclExportContainerCount,
            };

            await FclExportBookingContainer.create(payload)
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Charges for Booking.",
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
   * Full Container Load(FCL)-ExportBookingContainer data based on id
   * @param req
   * @param res
   * @returns void
   */
  find: async (req, res, next) => {
    try {
      const id = req.params.id;
      FclExportBookingContainer.findAll({
        where: { bookingIdFk: id },
      })
        .then((data) => {
          if (data) {
            res.send(data);
          } else {
            res.status(404).send({
              message: `Cannot find Booking Charges with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error retrieving Booking Charges with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

    /**
     * @method update
     * @description this method will update 
     * Full Container Load(FCL)-ExportBookingContainer data based on id
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
            FclExportBookingContainer.update(req.body, {
                where: { id: id },
            })
                .then((num) => {
                    if (num == 1) {
                        res.send({
                            message: "Booking Charges was updated successfully.",
                        });
                    } else {
                        res.send({
                            message: `Cannot update Booking Charges with id=${id}. Maybe Booking Charges was not found or req.body is empty!`,
                        });
                    }
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Error updating Booking Charges with id=" + id,
                    });
                });
        } 
    }catch (error) {
            console.log(error.message);
        }
    },

    /**
     * @method delete
     * @description this method will delete 
     * Full Container Load(FCL)-ExportBookingContainer data based on id
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
            FclExportBookingContainer.destroy({
                where: { id: id },
            })
                .then((num) => {
                    if (num == 1) {
                        res.send({
                            message: "Booking Charges was deleted successfully!",
                        });
                    } else {
                        res.send({
                            message: `Cannot delete Booking Charges with id=${id}. Maybe Booking Charges was not found!`,
                        });
                    }
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Could not delete Booking Charges with id=" + id,
                    });
                });
        } 
    }catch (error) {
            console.log(error.message);
        }
    },

  /**
   * @method loadPackages
   * @description this method will fetch all
   * Full Container Load(FCL)-ExportBookingContainer Based on Id for Packages
   * @param req
   * @param res
   * @returns void
   */
  loadPackages: async (req, res) => {
    try {
      db.query(" select * from sc_package_tbl")
        .then((data) => {
          res.send(data[0]);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Charges.",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method loadContainers
   * @description this method will fetch all
   * Full Container Load(FCL)-ExportBookingContainer Based on Id for Containers
   * @param req
   * @param res
   * @returns void
   */
  loadContainers: async (req, res) => {
    try {
      const id = req.params.id;
      db.query(
        ' select \
                (select sc.id),(select sc."containerName")\
                from sc_fcl_export_booking_containers sfebc left join sc_containers sc on \
                sc.id = sfebc."fclExportContainerNameFk"  where sfebc."fclExportBookingNo" =' +
          id
      )
        .then((data) => {
          res.send(data[0]);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Charges.",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },
};
