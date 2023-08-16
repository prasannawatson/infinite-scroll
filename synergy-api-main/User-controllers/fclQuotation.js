const db = require("../db");
var _ = require("lodash");

const fclQuotation = require("../User-Models/fclquotation.model");
const fclQuotationCharges = require("../User-Models/fclquotationcharges.model");
const authController = require("../User-controllers/auth");
const roles = require("../roles");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Full Container Load(FCL)-Quotation data
   * @param req
   * @param res
   * @returns void
   */
  getAll: async (req, res) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclQuotation).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        fclQuotation
          .findAll()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving Quotation.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method findAndCountAll
   * @description this method will Find and Show all Full Container Load(FCL)-Quotation data
   * @param req
   * @param res
   * @returns void
   */
  findAndCountAll: async (req, res) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclQuotation).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const search = JSON.parse(req.query.search);
        let query =
          "select *, (SELECT json_agg(json_build_object(\
          'id',t.id,\
          'quotationId',t.\"quotationId\",\
          'fclChargeCode',t.\"fclChargeCode\",\
          'fclChargeName',t.\"fclChargeName\",\
          'fclChargeType',t.\"fclChargeType\", \
          'fclCurrency',t.\"fclCurrency\", \
          'fclUOM',t.\"fclUOM\",\
          'fclMinBuyAmnt',t.\"fclMinBuyAmnt\",\
          'buyAmntPrUnit',t.\"buyAmntPrUnit\",\
          'fclMinSellAmnt',t.\"fclMinSellAmnt\",\
          'sellAmntPrUnit',t.\"sellAmntPrUnit\",\
          'totBuy',t.\"totBuy\",\
          'totSell',t.\"totSell\",\
          'grossProfit',t.\"grossProfit\",\
          'profitPercentage',t.\"profitPercentage\")) as charges\
          from sc_fcl_quotation_charges as t where t.\"quotationId\" = sfq.id) from sc_fcl_quotations sfq ";
        db.query(query)
          .then((data) => {
            db.query(
              "select count(sc_fcl_quotations.id) from sc_fcl_quotations"
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
   * @method create
   * @description this method will create new Full Container Load(FCL)-quotation
   * @param req
   * @param res
   * @returns void
   */
  create: async (req, res) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.createFclQuotation).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const quotation = {
          quotationId: req.body.quotationId,
          fclPlaceOfRecieptFk: req.body.fclPlaceOfRecieptFk,
          fclPortOfLoadingFk: req.body.fclPortOfLoadingFk,
          fclPortOfLoadingFk: req.body.fclPortOfLoadingFk,
          fclPortOfDeliveryFk: req.body.fclPortOfDeliveryFk,
          fclPlaceOfDeliveryFk: req.body.fclPlaceOfDeliveryFk,
          fclTermsFk: req.body.fclTermsFk,
          PPCC: req.body.PPCC,
          fclCarrierFk: req.body.fclCarrierFk,
          drtTrnst: req.body.drtTrnst,
          fclTransitPortFk: req.body.fclTransitPortFk,
          transitTime: req.body.transitTime,
          frequency: req.body.frequency,
          fclContainer: req.body.fclContainer,
          validFrom: req.body.validFrom,
          validTill: req.body.validTill,
          fclExportMovement: req.body.fclExportMovement,
          noOfPackages: req.body.noOfPackages,
          weightKgs: req.body.weightKgs,
          weightLbs: req.body.weightLbs,
          uomWeight: req.body.uomWeight,
          lengthCm: req.body.lengthCm,
          lengthInches: req.body.lengthInches,
          widthCm: req.body.widthCm,
          widthInches: req.body.widthInches,
          heightCm: req.body.heightCm,
          heightInches: req.body.heightInches,
          uomMeasurment: req.body.uomMeasurment,
          volume: req.body.volume,
          uomVolume: req.body.uomVolume,
          chargeableKgs: req.body.chargeableKgs,
          chargeableLbs: req.body.chargeableLbs,
          uomChargeable: req.body.uomChargeable,
          fclHazardous: req.body.fclHazardous,
          fclHtsCode: req.body.fclHtsCode,
          fclPickupAddress: req.body.fclPickupAddress,
          fclDeliveryAddress: req.body.fclDeliveryAddress,
          fclCommodity: req.body.fclCommodity,
          fclConsignor: req.body.fclConsignor,
          fclConsignee: req.body.fclConsignee,
          fclControllingParty: req.body.fclControllingParty,
          insuranceValue: req.body.insuranceValue,
          cargoValue: req.body.cargoValue,
          fclFreightStatus: req.body.fclFreightStatus,
        };
        await fclQuotation
          .create(quotation)
          .then((data) => {
            let charges = JSON.parse(JSON.stringify(req.body.charges));
            charges.map((item) => {
              delete item.id;
              item.quotationId = data.id;
            });
            fclQuotationCharges.bulkCreate(charges);
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Quotation.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Full Container Load(FCL)-quotation data based on id
   * @param req
   * @param res
   * @returns void
   */
  find: async (req, res, next) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclQuotation).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        let query =
          'select *, (SELECT json_agg(json_build_object(\
          \'id\',t.id,\
          \'quotationId\',t."quotationId",\
          \'fclChargeCode\',t."fclChargeCode",\
          \'fclChargeName\',t."fclChargeName",\
          \'fclChargeType\',t."fclChargeType", \
          \'fclCurrency\',t."fclCurrency", \
          \'fclUOM\',t."fclUOM",\
          \'fclMinBuyAmnt\',t."fclMinBuyAmnt",\
          \'buyAmntPrUnit\',t."buyAmntPrUnit",\
          \'fclMinSellAmnt\',t."fclMinSellAmnt",\
          \'sellAmntPrUnit\',t."sellAmntPrUnit",\
          \'totBuy\',t."totBuy",\
          \'totSell\',t."totSell",\
          \'grossProfit\',t."grossProfit",\
          \'profitPercentage\',t."profitPercentage")) as charges\
          from sc_fcl_quotation_charges as t where t."quotationId" = sfq.id) from sc_fcl_quotations sfq where sfq."quotationId" = ' +
          id;
        db.query(query).then((data) => {
          db.query(
            "select count(sc_fcl_quotations.id) from sc_fcl_quotations"
          ).then((count) => {
            const response = {
              count: count[0][0].count,
              data: data[0],
              currentPage: req.query.currentPage,
              limit: req.query.limit,
            };
            res.send(response.data);
          });
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Full Container Load(FCL)-quotation data based on id
   * @param req
   * @param res
   * @returns void
   */
  update: async (req, res, next) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.editFclQuotation).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        fclQuotation
          .update(req.body, {
            where: { id: id },
          })
          .then((num) => {
            if (num == 1) {
              let charges = JSON.parse(JSON.stringify(req.body.charges));
              charges = JSON.parse(charges);
              charges.map((item) => {
                item.quotationId = id;
              });
              const oldRecords = charges.filter((item) => {
                return item?.id > 0;
              });
              const newRecords = charges.filter((item) => {
                return item?.id <= 0;
              });
              oldRecords.forEach((oldRecord) => {
                fclQuotationCharges.update(oldRecord, {
                  where: { id: oldRecord.id },
                });
              });
              newRecords.map((newRecord) => {
                delete newRecord.id;
              });
              fclQuotationCharges.bulkCreate(newRecords);
              res.send({
                message: "Quotation was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Quotation with id=${id}. Maybe Quotation was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Quotation with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Full Container Load(FCL)-Quotation data based on id
   * @param req
   * @param res
   * @returns void
   */
  delete: async (req, res, next) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.deleteFclQuotation).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        fclQuotation
          .destroy({
            where: { id: id },
          })
          .then((num) => {
            fclQuotationCharges.destroy({
              where: { quotationId: id },
            });
            if (num == 1) {
              res.send({
                message: "Quotation was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete Quotation with id=${id}. Maybe Quotation was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Quotation with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
