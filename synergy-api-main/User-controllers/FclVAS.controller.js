const db = require("../db");
var _ = require("lodash");
const roles = require("../roles");
const VAS = require("../User-Models/FclVAS.model");
const authController = require("../User-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Full Container Load(FCL)-Value Added Services (VAS)
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
        sfv."bookingIdFk" as "bookingIdFk",\
        sc."customerName"  as "customerNameIdFk",\
        sfv."contactMail" as "contactMail",\
        sfv."contactMobile" as "contactMobile",\
        sfv."contactPerson" as "contactPerson",\
        sfv."contactPhone" as "contactPhone",\
        sfv."containerDelivery" as "containerDelivery",\
        sfv."containerPickUp" as "containerPickUp",\
        sfv."createdAt" as "createdAt",\
        sfv."createdBy" as "createdBy",\
        sfv."customerNameIdFk" as "customerNameIdFk",\
        sfv."id" as "id",\
        sfv."modifiedBy" as "modifiedBy",\
        sfv."pickupAddress" as "pickupAddress",\
        sfv."pickupDate" as "pickupDate",\
        sfv."pickupPlace" as "pickupPlace",\
        sfv."pickupTime" as "pickupTime",\
        sfv."stuffingAddress" as "stuffingAddress",\
        sfv."truckerAddress" as "truckerAddress",\
        sfv."truckerMail" as "truckerMail",\
        sfv."truckerMobile" as "truckerMobile",\
        sfv."truckerName" as "truckerName",\
        sfv."truckerPhone" as "truckerPhone",\
        sfv."updatedAt" as "updatedAt",\
        sfv."vasStatus" as "vasStatus"\
         from sc_fcl_vas sfv join sc_customers sc on sc.id = sfv."customerNameIdFk" '
        )
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving VAS.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new Full Container Load(FCL)-Value Added Services (VAS)
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
          bookingIdFk: req.body.bookingIdFk,
          customerNameIdFk: req.body.customerNameIdFk,
          truckerName: req.body.truckerName,
          truckerPhone: req.body.truckerPhone,
          truckerMobile: req.body.truckerMobile,
          truckerMail: req.body.truckerMail,
          truckerAddress: req.body.truckerAddress,
          containerPickUp: req.body.containerPickUp,
          stuffingAddress: req.body.stuffingAddress,
          containerDelivery: req.body.containerDelivery,
          pickupPlace: req.body.pickupPlace,
          contactPerson: req.body.contactPerson,
          contactPhone: req.body.contactPhone,
          contactMobile: req.body.contactMobile,
          contactMail: req.body.contactMail,
          pickupDate: req.body.pickupDate,
          pickupTime: req.body.pickupTime,
          pickupAddress: req.body.pickupAddress,
          vasStatus: req.body.vasStatus,
          createdBy: req.body.createdBy,
          modifiedBy: req.body.modifiedBy,
        };

        await VAS.create(payload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the VAS.",
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
   * Full Container Load(FCL)-Value Added Services (VAS) based on bookingId
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
        const search = JSON.parse(req.query.search);
        let query =
          'select \
        sfv."bookingIdFk" as "bookingIdFk",\
        sc."customerName"  as "customerNameIdFk",\
        sfv."contactMail" as "contactMail",\
        sfv."contactMobile" as "contactMobile",\
        sfv."contactPerson" as "contactPerson",\
        sfv."contactPhone" as "contactPhone",\
        sfv."containerDelivery" as "containerDelivery",\
        sfv."containerPickUp" as "containerPickUp",\
        sfv."createdAt" as "createdAt",\
        sfv."createdBy" as "createdBy",\
        sfv."id" as "id",\
        sfv."modifiedBy" as "modifiedBy",\
        sfv."pickupAddress" as "pickupAddress",\
        sfv."pickupDate" as "pickupDate",\
        sfv."pickupPlace" as "pickupPlace",\
        sfv."pickupTime" as "pickupTime",\
        sfv."stuffingAddress" as "stuffingAddress",\
        sfv."truckerAddress" as "truckerAddress",\
        sfv."truckerMail" as "truckerMail",\
        sfv."truckerMobile" as "truckerMobile",\
        sfv."truckerName" as "truckerName",\
        sfv."truckerPhone" as "truckerPhone",\
        sfv."updatedAt" as "updatedAt",\
        sfv."vasStatus" as "vasStatus"\
        from sc_fcl_vas sfv join sc_customers sc on sc.id = sfv."customerNameIdFk" WHERE sfv."bookingIdFk"=' +
          id +
          "and";
        if (
          search.customerNameIdFk !== null &&
          search.customerNameIdFk !== ""
        ) {
          query +=
            ' LOWER(sc."customerName") like \'%' +
            search.customerNameIdFk.toLowerCase() +
            "%' and ";
        }
        if (search.pickupAddress !== null && search.pickupAddress !== "") {
          query +=
            ' LOWER(sfv."pickupAddress") like \'%' +
            search.pickupAddress.toLowerCase() +
            "%' and ";
        }
        if (search.contactPerson !== null && search.contactPerson !== "") {
          query +=
            ' LOWER(sfv."contactPerson") like \'%' +
            search.contactPerson.toLowerCase() +
            "%' and ";
        }
        if (search.pickupAddress !== null && search.pickupAddress !== "") {
          query +=
            ' LOWER(sfv."pickupAddress") like \'%' +
            search.pickupAddress.toLowerCase() +
            "%' and ";
        }
        if (search.truckerMobile !== null && search.truckerMobile !== "") {
          query +=
            ' CAST(sfv."truckerMobile" AS VARCHAR) like \'%' +
            search.truckerMobile +
            "%' and ";
        }
        if (search.contactMobile !== null && search.contactMobile !== "") {
          query +=
            ' CAST(sfv."contactMobile" AS VARCHAR) like \'%' +
            search.contactMobile +
            "%' and ";
        }
        if (search.pickupDate !== null && search.pickupDate !== "") {
          query +=
            ' CAST(sfv."pickupDate" AS VARCHAR) like \'%' +
            search.pickupDate +
            "%' and ";
        }
        if (search.pickupTime !== null && search.pickupTime !== "") {
          query +=
            ' CAST(sfv."pickupTime" AS VARCHAR) like \'%' +
            search.pickupTime +
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
              'select count(sfv2."bookingIdFk") from sc_fcl_vas sfv2 where sfv2."bookingIdFk"=' +
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
              message: "Error retrieving VAS with Booking Id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getCustomerTruker
   * @description this method will Load CustomerTruker for Value Added Services (VAS)
   * @param req
   * @param res
   * @returns void
   */
  getCustomerTruker: async (req, res) => {
    try {const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclBooking).then((result) => {
      return result;
    });
    if (!auth) {
      res.status(401).send({
        message: "Unauthorized.",
      });
    } else {
        db.query('select sc."id", sc."customerName", sc."customerCode"  from sc_customers sc join sc_customer_details scd on sc.id = scd."customerIdFk" \
        where scd."vendorParty"->\'trucker\' = \'true\' ')
            .then((data) => {
                res.send(data[0]);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Customer.",
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
   * Full Container Load(FCL)-Value Added Services (VAS) based on id
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
        VAS.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "VAS was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update VAS with id=${id}. Maybe VAS was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating VAS with id=" + id,
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
   * Full Container Load(FCL)-Value Added Services (VAS) data based on id
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
        VAS.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "VAS was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete VAS with id=${id}. Maybe VAS was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete VAS with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
