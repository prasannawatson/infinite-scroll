const db = require("../db");
var _ = require("lodash");
const roles = require("../roles");    
const lclQuotation = require('../User-Models/LCLQuotation.model')
const lclQuotationCharges = require("../User-Models/LCLQuotationCharges.model");
const authController = require("../User-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Less Container Load(LCL)-Quotation data
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
        lclQuotation
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
   * @description this method will Find and Show all Less Container Load(LCL)-Quotation data
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
          "select *, (SELECT json_agg(json_build_object(\
          'id',t.id,\
          'quotationId',t.\"quotationId\",\
          'lclChargeCode',t.\"lclChargeCode\",\
          'lclChargeName',t.\"lclChargeName\",\
          'lclChargeType',t.\"lclChargeType\", \
          'lclCurrency',t.\"lclCurrency\", \
          'lclUOM',t.\"lclUOM\",\
          'lclMinBuyAmnt',t.\"lclMinBuyAmnt\",\
          'buyAmntPrUnit',t.\"buyAmntPrUnit\",\
          'lclMinSellAmnt',t.\"lclMinSellAmnt\",\
          'sellAmntPrUnit',t.\"sellAmntPrUnit\",\
          'totBuy',t.\"totBuy\",\
          'totSell',t.\"totSell\",\
          'grossProfit',t.\"grossProfit\",\
          'profitPercentage',t.\"profitPercentage\")) as charges\
          from sc_lcl_quotation_charges as t where t.\"quotationId\" = slq.id) from sc_lcl_quotations slq ";
        db.query(query)
          .then((data) => {
            db.query(
              "select count(sc_lcl_quotations.id) from sc_lcl_quotations"
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
   * @description this method will create new Less Container Load(LCL)-Quotation
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
          lclPlaceOfRecieptFk: req.body.lclPlaceOfRecieptFk,
          lclPortOfLoadingFk: req.body.lclPortOfLoadingFk,
          lclPortOfLoadingFk: req.body.lclPortOfLoadingFk,
          lclPortOfDeliveryFk: req.body.lclPortOfDeliveryFk,
          lclPlaceOfDeliveryFk: req.body.lclPlaceOfDeliveryFk,
          lclTermsFk: req.body.lclTermsFk,
          PPCC: req.body.PPCC,
          lclCarrierFk: req.body.lclCarrierFk,
          drtTrnst: req.body.drtTrnst,
          lclTransitPortFk: req.body.lclTransitPortFk,
          transitTime: req.body.transitTime,
          frequency: req.body.frequency,
          validFrom: req.body.validFrom,
          validTill: req.body.validTill,
          lclExportMovement: req.body.lclExportMovement,
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
          lclHazardous: req.body.lclHazardous,
          lclHtsCode: req.body.lclHtsCode,
          lclPickupAddress: req.body.lclPickupAddress,
          lclDeliveryAddress: req.body.lclDeliveryAddress,
          lclCommodity: req.body.lclCommodity,
          lclConsignor: req.body.lclConsignor,
          lclConsignee: req.body.lclConsignee,
          lclControllingParty: req.body.lclControllingParty,
          insuranceValue: req.body.insuranceValue,
          cargoValue: req.body.cargoValue,
          lclFreightStatus: req.body.lclFreightStatus,
        };
        await lclQuotation
          .create(quotation)
          .then((data) => {
            let charges = JSON.parse(JSON.stringify(req.body.charges));
            charges.map((item) => {
              delete item.id;
              item.quotationId = data.id;
            });
            lclQuotationCharges.bulkCreate(charges);
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
   * @description this method will Find and Show Less Container Load(LCL)-Quotation data based on id
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
          \'lclChargeCode\',t."lclChargeCode",\
          \'lclChargeName\',t."lclChargeName",\
          \'lclChargeType\',t."lclChargeType", \
          \'lclCurrency\',t."lclCurrency", \
          \'lclUOM\',t."lclUOM",\
          \'lclMinBuyAmnt\',t."lclMinBuyAmnt",\
          \'buyAmntPrUnit\',t."buyAmntPrUnit",\
          \'lclMinSellAmnt\',t."lclMinSellAmnt",\
          \'sellAmntPrUnit\',t."sellAmntPrUnit",\
          \'totBuy\',t."totBuy",\
          \'totSell\',t."totSell",\
          \'grossProfit\',t."grossProfit",\
          \'profitPercentage\',t."profitPercentage")) as charges\
          from sc_lcl_quotation_charges as t where t."quotationId" = slq.id) from sc_lcl_quotations slq where slq."quotationId" = ' +
          id;
        db.query(query).then((data) => {
          db.query(
            "select count(sc_lcl_quotations.id) from sc_lcl_quotations"
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
   * @description this method will update Less Container Load(LCL)-Quotation data based on id
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
        lclQuotation
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
                lclQuotationCharges.update(oldRecord, {
                  where: { id: oldRecord.id },
                });
              });
              newRecords.map((newRecord) => {
                delete newRecord.id;
              });
              lclQuotationCharges.bulkCreate(newRecords);
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
   * @description this method will delete Less Container Load(LCL)-Quotation data based on id
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
        lclQuotation
          .destroy({
            where: { id: id },
          })
          .then((num) => {
            lclQuotationCharges.destroy({
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
