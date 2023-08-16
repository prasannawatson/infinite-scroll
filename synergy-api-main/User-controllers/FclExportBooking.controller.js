const db = require("../db");
const roles = require("../roles");
var _ = require("lodash");
const FclExportBooking = require("../User-Models/FclExportBooking.model");
const bookingHistory = require("../User-Models/FclBookingHistory.model");
const FclExportBookingContainer = require("../User-Models/FclExportBookingContainer.model");
const authController = require("../Admin-controllers/auth");
const Sequelize = require("sequelize");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Full Container Load(FCL)-ExportBooking data
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
        const search = req.query.search;
        let query =
          'select sfeb."id" as "id",\
        sfeb."fclExportBookingNo" as "fclExportBookingNo",\
        sfeb."fclExportRoutedBy" as "fclExportRoutedBy",\
        (select "customerName" from sc_customers scd where scd.id = sfeb."fclExportCustomerIdFk") as "fclExportCustomerIdFk",\
        (select "customerName" from sc_customers scd where scd.id = sfeb."fclExportAgentFk") as "fclExportAgentFk",\
        (select "customerName" from sc_customers scd where scd.id = sfeb."fclExportShipperFk") as "fclExportShipperFk",\
        (select "seaPortName" from sc_seaports ss where ss.id  = sfeb."fclExportPoLoading") as "fclExportPoLoading",\
        (select "seaPortName" from sc_seaports ss where ss.id  = sfeb."fclExportPoDelivery") as "fclExportPoDelivery",\
        (select "incoTermName" from sc_incoterms si where si.id = sfeb."fclExportTosFk") as "fclExportTosFk"\
        from sc_fcl_export_bookings sfeb where \
        sfeb."id" not in (select CAST(coalesce("fclJobBookingId", \'0\') AS integer) from sc_fcl_job_attachments)';

        if (search !== null && search !== "") {
          query = query + ' and sfeb."id" = ' + String(search) + "";
        }

        if (!search) {
          query =
            query +
            " LIMIT " +
            req.query.limit +
            " OFFSET " +
            req.query.currentPage * req.query.limit +
            "";
        }

        db.query(query)
          .then((data) => {
            res.send(data[0]);
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
   * @method findAndCountAll
   * @description this method will Find and Show all Full Container Load(FCL)-ExportBooking data
   * @param req
   * @param res
   * @returns void
   */
  findAndCountAll: async (req, res) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclBooking)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const search = JSON.parse(req.query.search);
        
        let query =
          'select sfeb."id" as "id",\
                sfeb."fclExportBookingNo" as "fclExportBookingNo",\
                sfeb."fclExportRoutedBy" as "fclExportRoutedBy",\
                sfeb."fclExportBookingStatus" as "status",\
                (select "customerName" from sc_customers scd where scd.id = sfeb."fclExportCustomerIdFk") as "fclExportCustomerIdFk",\
                (select "customerName" from sc_customers scd where scd.id = sfeb."fclExportAgentFk") as "fclExportAgentFk",\
                (select "customerName" from sc_customers scd where scd.id = sfeb."fclExportShipperFk") as "fclExportShipperFk",\
                (select "seaPortName" from sc_seaports ss where ss.id  = sfeb."fclExportPoLoading") as "fclExportPoLoading",\
                (select "seaPortName" from sc_seaports ss where ss.id  = sfeb."fclExportPoDelivery") as "fclExportPoDelivery",\
                (select "incoTermName" from sc_incoterms si where si.id = sfeb."fclExportTosFk") as "fclExportTosFk"\
                from sc_fcl_export_bookings sfeb where \
                sfeb."id" not in (select CAST(coalesce("fclJobBookingId", \'0\') AS integer) from sc_fcl_job_attachments) and';

        if (
          search.fclExportRoutedBy !== null &&
          search.fclExportRoutedBy !== ""
        ) {
          query +=
            ' LOWER(sfeb."fclExportRoutedBy") like \'%' +
            search.fclExportRoutedBy.toLowerCase() +
            "%' and ";
        }
        if (
          search.fclExportBookingNo !== null &&
          search.fclExportBookingNo !== ""
        ) {
          query +=
            ' CAST(sfeb."fclExportBookingNo" AS VARCHAR) like \'%' +
            search.fclExportBookingNo +
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
              'select count(sfeb.id) from sc_fcl_export_bookings sfeb where sfeb."id" not in (select CAST(coalesce("fclJobBookingId", \'0\') AS integer) from sc_fcl_job_attachments)'
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
                err.message || "Some error occurred while retrieving Charges.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getAllForJobs
   * @description this method will fetch All JOB-Details data
   * @param req
   * @param res
   * @returns void
   */
  getAllForJobs: async (req, res) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclJob).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        db.query(
          'select sfeb."id" as "id",\
        sfeb."fclExportBookingNo" as "fclExportBookingNo",\
        sfeb."fclExportRoutedBy" as "fclExportRoutedBy",\
        (select "customerName" from sc_customers scd where scd.id = sfeb."fclExportCustomerIdFk") as "fclExportCustomerIdFk",\
        (select "customerName" from sc_customers scd where scd.id = sfeb."fclExportAgentFk") as "fclExportAgentFk",\
        (select "customerName" from sc_customers scd where scd.id = sfeb."fclExportShipperFk") as "fclExportShipperFk",\
        (select "seaPortName" from sc_seaports ss where ss.id  = sfeb."fclExportPoLoading") as "fclExportPoLoading",\
        (select "seaPortName" from sc_seaports ss where ss.id  = sfeb."fclExportPoDelivery") as "fclExportPoDelivery",\
        (select "incoTermName" from sc_incoterms si where si.id = sfeb."fclExportTosFk") as "fclExportTosFk"\
        from sc_fcl_export_bookings sfeb where \
        sfeb."fclExportPoLoading" = ' +
            req.query.fclExportPoLoading +
            ' and sfeb."fclExportPoDelivery"= ' +
            req.query.fclExportPoDelivery +
            '\
        and sfeb."fclExportAgentFk" = ' +
            req.query.fclExportAgentFk +
            ' \
        and sfeb."id" not in (select "fclJobBookingId" from sc_fcl_job_attachments sfja where sfja."fclJobDetailsId" = ' +
            req.query.jobId +
            ")\
        "
        )
          .then((data) => {
            res.send(data[0]);
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
   * @method getAllBookingForJobs
   * @description this method will fetch all Full Container Load(FCL)-ExportBooking Details based on Id For jobs
   * @param req
   * @param res
   * @returns void
   */
  getAllBookingForJobs: async (req, res) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclJob).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        db.query(
          'select sfeb."id" as "id",\
        sfeb."fclExportBookingNo" as "fclExportBookingNo",\
        sfja."id" as "attachmentId",\
        sfeb."fclExportRoutedBy" as "fclExportRoutedBy",\
        (select "customerName" from sc_customers scd where scd.id = sfeb."fclExportCustomerIdFk") as "fclExportCustomerIdFk",\
        (select "customerName" from sc_customers scd where scd.id = sfeb."fclExportAgentFk") as "fclExportAgentFk",\
        (select "customerName" from sc_customers scd where scd.id = sfeb."fclExportShipperFk") as "fclExportShipperFk",\
        (select "seaPortName" from sc_seaports ss where ss.id  = sfeb."fclExportPoLoading") as "fclExportPoLoading",\
        (select "seaPortName" from sc_seaports ss where ss.id  = sfeb."fclExportPoDelivery") as "fclExportPoDelivery",\
        (select "incoTermName" from sc_incoterms si where si.id = sfeb."fclExportTosFk") as "fclExportTosFk"\
         from sc_fcl_export_bookings sfeb join sc_fcl_job_attachments sfja on sfja ."fclJobBookingId" = sfeb."id" \
        where sfja ."fclJobDetailsId" = ' +
            req.query.id +
            ""
        )
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving Fcl Export Booking.",
            });
          });
      }
    }
     catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getAllForBOL
   * @description this method will fetch all Full Container Load(FCL)-ExportBooking Details Based on id for Bill of ladding(BOL)
   * @param req
   * @param res
   * @returns void
   */
  getAllForBOL: async (req, res) => {
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
          `select sfeb."fclExportShipperAddress" ,sfeb."fclExportConsigneeAddres" ,sfeb."fclExportNotifyAddres",\
        sfeb."fclExportTerms",sfeb."fclExportMovement" , \
        (concat(ss."seaPortName",'-',ss."seaPortCountry",'(',ss."seaPortCode",')') )as "fclExportPoRecieptFk",\
        (concat(ss2."seaPortName",'-',ss2."seaPortCountry",'(',ss2."seaPortCode",')') )as "fclExportPoLoading",\
        (concat(ss3."seaPortName",'-',ss3."seaPortCountry",'(',ss3."seaPortCode",')') )as "fclExportPoDischarge",\
        (concat(ss4."seaPortName",'-',ss4."seaPortCountry",'(',ss4."seaPortCode",')') )as "fclExportPoDelivery",\
        (select sli."voyageNumber" from sc_liner_informations sli where sli."bookingIdFk" =(:bookingId))as "voyageNumber"\
        from sc_fcl_export_bookings sfeb left join sc_seaports ss on ss.id = sfeb."fclExportPoRecieptFk"\
        join sc_seaports ss2 on ss2.id = sfeb."fclExportPoLoading" join sc_seaports ss3 on\
        ss3.id = sfeb."fclExportPoDischarge" join sc_seaports ss4 on ss4.id = sfeb."fclExportPoDelivery" where sfeb.id =(:bookingId)`,
          {
            replacements: { bookingId: req.params.id },
          }
        )
          .then((data) => {
            res.send(data[0][0]);
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
   * @description this method will create new Full Container Load(FCL)-ExportBooking Details
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
          fclExportCustomerIdFk: req.body.fclExportCustomerIdFk,
          fclExportRoutedBy: req.body.fclExportRoutedBy,
          fclExportSalesPerson: req.body.fclExportSalesPerson,
          fclExportPoRecieptFk: req.body.fclExportPoRecieptFk,
          fclExportPoLoading: req.body.fclExportPoLoading,
          fclExportPoDischarge: req.body.fclExportPoDischarge,
          fclExportPoDelivery: req.body.fclExportPoDelivery,
          fclExportAgentFk: req.body.fclExportAgentFk,
          fclExportShipperFk: req.body.fclExportShipperFk,
          fclExportConsigneeFk: req.body.fclExportConsigneeFk,
          fclExportNotifyFk: req.body.fclExportNotifyFk,
          fclExportTosFk: req.body.fclExportTosFk,
          fclExportTerms: req.body.fclExportTerms,
          fclExportMovement: req.body.fclExportMovement,
          fclExportCommodity: req.body.fclExportCommodity,
          fclExportMarksAndNumbers: req.body.fclExportMarksAndNumbers,
          fclExportPiecesCount: req.body.fclExportPiecesCount,
          fclExportPackageIdFk: req.body.fclExportPackageIdFk,
          fclExportWeightKgs: req.body.fclExportWeightKgs,
          fclExportWeightLbs: req.body.fclExportWeightLbs,
          fclExportCft: req.body.fclExportCft,
          fclExportLogIdFk: req.body.fclExportLogIdFk,
          fclExportCbm: req.body.fclExportCbm,
          fclExportContainerNameFk: req.body.fclExportContainerNameFk,
          fclExportContainerCount: req.body.fclExportContainerCount,
          fclExportinternalNotes: req.body.fclExportinternalNotes,
          fclExportRoutingAddress: req.body.fclExportRoutingAddress,
          fclExportAgentAddres: req.body.fclExportAgentAddres,
          fclExportShipperAddress: req.body.fclExportShipperAddress,
          fclExportConsigneeAddres: req.body.fclExportConsigneeAddres,
          fclExportNotifyAddres: req.body.fclExportNotifyAddres,
          fclExportBookingDate: req.body.fclExportBookingDate,
          fclExportBookingStatus: req.body.fclExportBookingStatus,
          modifiedBy: req.body.modifiedBy,
          fclExportContainers: req.body.fclExportContainers,
        };

        await FclExportBooking.create(payload)
          .then((data) => {
            const container = JSON.parse(
              JSON.stringify(req.body.fclExportContainers)
            );
            container.map((item) => {
              delete item.id;
              item.fclExportBookingNo = data.id;
              item.fclTotalContainersCount = 0;
            });
            FclExportBookingContainer.bulkCreate(container);
            const history = {
              bookingId: data.id,
              description: data.id + " - New booking was created",
              type: "New Booking",
              createdBy: 1,
              modifiedBy: 1,
            };
            bookingHistory.create(history).then(() => {
              console.log("Log Created");
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
   * @description this method will Find and Show Full Container Load(FCL)-ExportBooking Details data based on id
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
        FclExportBooking.findByPk(id)
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
   * @description this method will update Full Container Load(FCL)-ExportBooking Details data based on id
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
        FclExportBooking.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Fcl Export Booking was updated successfully.",
              });
            } else {
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
   * @description this method will delete Full Container Load(FCL)-ExportBooking Details data based on id
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
        FclExportBooking.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
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

  /**
   * @method getSeaportData
   * @description this method will fetch all SeaPort data
   * @param req
   * @param res
   * @returns void
   */
  getSeaportData: async (req, res) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclBooking)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        let query =
          'select "id", "seaPortCode", "seaPortName", "seaPortCountry"  from sc_seaports ORDER BY ID ASC';
        if (req.query.search) {
          query += ' where LOWER("seaPortName") like \'%' + req.query.search.toLowerCase() + "%'";
        }
        db.query(query)
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving SeaPort.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getContainerData
   * @description this method will fetch all Container data
   * @param req
   * @param res
   * @returns void
   */
  getContainerData: async (req, res) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclBooking)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        db.query(
          'SELECT "id", "containerName", "maxKG", "maxCBM", status FROM sc_containers;'
        )
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving SeaPort.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  /**
   * @method getIncoTermData
   * @description this method will fetch all IncoTerm Data
   * @param req
   * @param res
   * @returns void
   */
  getIncoTermData: async (req, res) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclBooking)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        db.query(
          'SELECT "id", "incoTermName", "incoTermDescription", "incoTermFreightTerm", status FROM sc_incoterms\
          where "incoTermName"!=\'ALL\''
        )
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving SeaPort.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
     * @method getIncoTermDataId
     * @description this method will fetch IncoTerm Data based on id
     * @param req
     * @param res
     * @returns void
     */
  getIncoTermDataId: async (req, res) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req, roles.viewFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id
        db.query('SELECT "id", "incoTermName", "incoTermDescription", "incoTermFreightTerm", status FROM sc_incoterms where id='+id)
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving SeaPort.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  /**
     * @method Container Data
     * @description this method will fetch all SeaPort data
     * @param req
     * @param res
     * @returns void
     */
  getIncoTermDataId: async (req, res) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req, roles.viewFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id
        db.query('SELECT "id", "incoTermName", "incoTermDescription", "incoTermFreightTerm", status FROM sc_incoterms where id='+id)
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving SeaPort.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  /**
     * @method Customer Data
     * @description this method will fetch all SeaPort data
     * @param req
     * @param res
     * @returns void
     */
  getCustomerData: async (req, res) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclBooking)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        db.query(
          'select scust."id" as "fclExportCustomerIdFk", \
          scust."id" as "id", \
          (select scust."customerName" as "customerName"),\
          (select "countryName" from sc_countries scnt where scnt.id = scust."customerCountryIdFk" )as "customerCountry"\
          from sc_customers scust left join sc_customer_details scd on scd."customerIdFk" = scust.id where scd."custGlobalCompanyId" ='+req.query.companyId
        )
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving SeaPort.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
     * @method Customer Data
     * @description this method will fetch all SeaPort data
     * @param req
     * @param res
     * @returns void
     */
  getCustomerDataId: async (req, res) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req, roles.viewFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        db.query('select scust."id" as "fclExportCustomerIdFk", \
        scust."id" as "id", \
        (select scust."customerName" as "customerName"),\
        (select "countryName" from sc_countries scnt where scnt.id = scust."customerCountryIdFk" )as "customerCountry"\
        from sc_customers scust left join sc_customer_details scd on scd."customerIdFk" = scust.id\
         where scd."custGlobalCompanyId" = '+req.query.companyId+' and scust.id  ='+id)
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            console.log(err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving SeaPort.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  /**
     * @method getPackages
     * @description this method will fetch all packages details
     * @param req
     * @param res
     * @returns void
     */
  getPackages: async (req, res) => {
      try {
        const auth = await authController.authorizeTokenWithAbility(req, roles.viewFclBooking).then((result) => {
          return result;
        });
        if (!auth) {
          res.status(401).send({
            message: "Unauthorized.",
          });
        }else{
            db.query('select * from sc_package_tbls')
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
    } catch (error) {
        console.log(error.message);
    }
},
};
