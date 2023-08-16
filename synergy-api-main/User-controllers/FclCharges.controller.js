const db = require("../db");
var _ = require("lodash");
const roles = require("../roles");
const FclCharges = require("../User-Models/FclCharges.model");
const authController = require("../User-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Full Container Load(FCL)-Charges
   * @param req
   * @param res
   * @returns void
   */
  getAll: async (req, res) => {
    try {
      FclCharges.findAll()
        .then((data) => {
          res.send(data);
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
   * @method create
   * @description this method will create new Full Container Load(FCL)-Charges for Booking
   * @param req
   * @param res
   * @returns void
   */
  create: async (req, res) => {
    try {const auth = await authController.authorizeTokenWithAbility(req,roles.createFclBooking).then((result) => {
      return result;
    });
    if (!auth) {
      res.status(401).send({
        message: "Unauthorized.",
      });
    } else {
      const payload = {
        id: req.body.id,
        bookingIdFk: req.body.bookingIdFk,
        chargesCodeIdFk: req.body.chargesCodeIdFk,
        chargePC: req.body.chargePC,
        chargeUomFk: req.body.chargeUomFk,
        chargeCurrencyFk: req.body.chargeCurrencyFk,
        chargeROE: req.body.chargeROE,
        chargeUnit: req.body.chargeUnit,
        chargeSellRate: req.body.chargeSellRate,
        chargeBuyRate: req.body.chargeBuyRate,
        rcvblPartyName: req.body.rcvblPartyName,
        pyblPartyName: req.body.pyblPartyName,
        chargeComment: req.body.chargeComment,
        chargeStatus: req.body.chargeStatus,
        createdBy: req.body.createdBy,
        modifiedBy: req.body.modifiedBy,
      };

      await FclCharges.create(payload)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the Charges for Booking.",
          });
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Booking Full Container Load(FCL)-Charges data based on id
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
        const search = JSON.parse(req.query.search);
        const id = req.params.id;
        let query =
          'select sfc."id" as "id", sfc."chargePC" as "chargePC",sfc."chargesCodeIdFk",sfc."chargeCurrencyFk",\
            sfc."chargeSellRate" ,sfc."chargeBuyRate", sfc."chargeComment",sfc."chargeUnit",sfc."chargeROE",sfc."chargeUomFk",\
            sfc."pyblPartyName",sfc."rcvblPartyName",\
            (select sc."chargesName") as "chargeName",\
            (select su."uomName")as "uomName",\
            (select sc2."currencyCode") as "currencyCode",\
            (select sc3."customerName") as "payable",\
            (select sc4."customerName") as "recievable",\
            (select sum(sfc."chargeSellRate"*sfc."chargeUnit"*sfc."chargeROE") from sc_fcl_charges sfc)as "totalSell",\
            (select sum(sfc."chargeBuyRate"*sfc."chargeUnit"*sfc."chargeROE") from sc_fcl_charges sfc)as "totalBuy",\
            (select sum(sfc."chargeSellRate"*sfc."chargeUnit"*sfc."chargeROE"-sfc."chargeBuyRate"*sfc."chargeUnit"*sfc."chargeROE") from sc_fcl_charges sfc)as "Net"\
            from sc_fcl_charges sfc left join sc_charges sc on sc.id=sfc."chargesCodeIdFk" \
            join sc_uoms su on su.id =sfc."chargeUomFk" \
            join sc_currencies sc2 on sc2.id = sfc."chargeCurrencyFk" \
            join sc_customers sc3 on sc3.id =sfc."pyblPartyName" \
            join sc_customers sc4 on sc4.id = sfc."rcvblPartyName" where sfc."bookingIdFk" =' +
          id +
          "and";
        if (search.currencyCode !== null && search.currencyCode !== "") {
          query +=
            ' LOWER(sc2."currencyCode") like \'%' +
            search.currencyCode.toLowerCase() +
            "%' and ";
        }
        if (search.chargeName !== null && search.chargeName !== "") {
          query +=
            ' LOWER(sc."chargesName") like \'%' +
            search.chargeName.toLowerCase() +
            "%' and ";
        }
        if (search.uomName !== null && search.uomName !== "") {
          query +=
            ' LOWER(su."uomName") like \'%' +
            search.uomName.toLowerCase() +
            "%' and ";
        }
        if (search.payable !== null && search.payable !== "") {
          query +=
            ' LOWER(sc3."customerName") like \'%' +
            search.payable.toLowerCase() +
            "%' and ";
        }
        if (search.chargeUnit !== null && search.chargeUnit !== "") {
          query +=
            ' CAST(sfc."chargeUnit" AS VARCHAR) like \'%' +
            search.chargeUnit +
            "%' and ";
        }
        if (search.chargeBuyRate !== null && search.chargeBuyRate !== "") {
          query +=
            ' CAST(sfc."chargeBuyRate" AS VARCHAR) like \'%' +
            search.chargeBuyRate +
            "%' and ";
        }
        if (search.chargeSellRate !== null && search.chargeSellRate !== "") {
          query +=
            ' CAST(sfc."chargeSellRate" AS VARCHAR) like \'%' +
            search.chargeSellRate +
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
              'select count(sfc2."bookingIdFk") from sc_fcl_charges sfc2 where sfc2."bookingIdFk"=' +
                id
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
              message: "Error retrieving Booking Charges with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method findChargesFcl
   * @description this method will Find and Show Booking Full Container Load(FCL)-Charges data based on id
   * @param req
   * @param res
   * @returns void
   */
  findChargesFcl: async (req, res, next) => {
    try {const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        db.query(
          'select scm.id, sc."chargesMCurId",su.id as "uomId",\
        (select sc."chargesName"),\
        sc."chargeTypeId",\
        (select sc."chargesCode"),\
        (select sc3."currencyROE"),\
        (select su."uomName"),\
        (select sc2."containerName" from sc_containers sc2 where sc2.id = scm."chargeContainerIdFk")\
        from sc_charges sc  left join sc_currencies sc3  on sc3.id=sc."chargesMCurId"\
        join sc_charges_mappings scm  on scm."chargeNameFk"  = sc.id join sc_uoms su on scm."chargeUOMFk" = su.id where sc.id =' +
            id
        )
          .then((data) => {
            if (data) {
              res.send(data[0]);
            } else {
              res.status(404).send({
                message: `Cannot find ChargesMapping with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            console.log(err)
            res.status(500).send({
              message: "Error retrieving ChargesMapping with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Full Container Load(FCL)-Charges data based on id
   * @param req
   * @param res
   * @returns void
   */
  update: async (req, res, next) => {
    try {const auth = await authController.authorizeTokenWithAbility(req,roles.editFclBooking).then((result) => {
      return result;
    });
    if (!auth) {
      res.status(401).send({
        message: "Unauthorized.",
      });
    } else {
      const id = req.params.id;
      FclCharges.update(req.body, {
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
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will deleteFull Container Load(FCL)-Charges data based on id
   * @param req
   * @param res
   * @returns void
   */
  delete: async (req, res, next) => {
    try {const auth = await authController.authorizeTokenWithAbility(req,roles.deleteFclBooking).then((result) => {
      return result;
    });
    if (!auth) {
      res.status(401).send({
        message: "Unauthorized.",
      });
    } else {
      const id = req.params.id;
      FclCharges.destroy({
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
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getChargesFcl
   * @description this method will fetch all Charges data for liner
   * @param req
   * @param res
   * @returns void
   */
  getChargesFcl: async (req, res) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        db.query('select id, "chargesCode"  from sc_charges sc')
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
   * @method getCurrenciesFcl
   * @description this method will fetch all Currencies data for liner
   * @param req
   * @param res
   * @returns void
   */
  getCurrenciesFcl: async (req, res) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        db.query('select id,"currencyCode","currencyROE"  from sc_currencies')
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
   * @method getCurrenciesFcl
   * @description this method will fetch all Currencies data for liner
   * @param req
   * @param res
   * @returns void
   */
  getCurrenciesFclId: async (req, res) => {
    const id = req.params.id
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        db.query('select id,"currencyCode","currencyROE"  from sc_currencies where id='+id)
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
   * @method getUomFcl
   * @description this method will fetch all UOM data for liner
   * @param req
   * @param res
   * @returns void
   */
  getUomFcl: async (req, res) => {
    const id = req.params.id
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        db.query('select id,"uomName"  from sc_uoms')
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
};
