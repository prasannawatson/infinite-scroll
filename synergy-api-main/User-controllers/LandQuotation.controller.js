const db = require("../db");
var _ = require("lodash");
const roles = require("../roles");    
const landQuotation = require('../User-Models/LandQuotation.model')
const landQuotationCharges = require("../User-Models/LandQuotationCharges.model");
const authController = require("../User-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Land-Quotation data
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
        landQuotation
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
   * @description this method will Find and Show all Land-Quotation data
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
          'landChargeCode',t.\"landChargeCode\",\
          'landChargeName',t.\"landChargeName\",\
          'landChargeType',t.\"landChargeType\", \
          'landCurrency',t.\"landCurrency\", \
          'landUOM',t.\"landUOM\",\
          'landMinBuyAmnt',t.\"landMinBuyAmnt\",\
          'buyAmntPrUnit',t.\"buyAmntPrUnit\",\
          'landMinSellAmnt',t.\"landMinSellAmnt\",\
          'sellAmntPrUnit',t.\"sellAmntPrUnit\",\
          'totBuy',t.\"totBuy\",\
          'totSell',t.\"totSell\",\
          'grossProfit',t.\"grossProfit\",\
          'profitPercentage',t.\"profitPercentage\")) as charges\
          from sc_land_quotation_charges as t where t.\"quotationId\" = slq.id) from sc_land_quotations slq ";
        db.query(query)
          .then((data) => {
            db.query(
              "select count(sc_land_quotations.id) from sc_land_quotations"
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
   * @description this method will create new Land-Quotation
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
          landPlaceOfRecieptFk: req.body.landPlaceOfRecieptFk,
          landPlaceOfDeliveryFk: req.body.landPlaceOfDeliveryFk,
          landTermsFk: req.body.landTermsFk,
          PPCC: req.body.PPCC,
          landCarrierFk: req.body.landCarrierFk,
          landVehicleType: req.body.landVehicleType,
          drtTrnst: req.body.drtTrnst,
          landTransitPlaceFk: req.body.landTransitPlaceFk,
          transitTime: req.body.transitTime,
          frequency: req.body.frequency,
          validFrom: req.body.validFrom,
          validTill: req.body.validTill,
          landExportMovement: req.body.landExportMovement,
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
          landHazardous: req.body.landHazardous,
          landHtsCode: req.body.landHtsCode,
          landPickupAddress: req.body.landPickupAddress,
          landDeliveryAddress: req.body.landDeliveryAddress,
          landCommodity: req.body.landCommodity,
          landConsignor: req.body.landConsignor,
          landConsignee: req.body.landConsignee,
          landControllingParty: req.body.landControllingParty,
          landSalesPerson: req.body.landSalesPerson,
          cargoValue: req.body.cargoValue,
          insuranceValue: req.body.insuranceValue,
          landFreightStatus: req.body.landFreightStatus,
        };
        await landQuotation
          .create(quotation)
          .then((data) => {
            let charges = JSON.parse(JSON.stringify(req.body.charges));
            charges.map((item) => {
              delete item.id;
              item.quotationId = data.id;
            });
            landQuotationCharges.bulkCreate(charges);
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
   * @description this method Find and Show Land-Quotation data based on id
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
        let query =
          'select *, (SELECT json_agg(json_build_object(\
          \'id\',t.id,\
          \'quotationId\',t."quotationId",\
          \'landChargeCode\',t."landChargeCode",\
          \'landChargeName\',t."landChargeName",\
          \'landChargeType\',t."landChargeType", \
          \'landCurrency\',t."landCurrency", \
          \'landUOM\',t."landUOM",\
          \'landMinBuyAmnt\',t."landMinBuyAmnt",\
          \'buyAmntPrUnit\',t."buyAmntPrUnit",\
          \'landMinSellAmnt\',t."landMinSellAmnt",\
          \'sellAmntPrUnit\',t."sellAmntPrUnit",\
          \'totBuy\',t."totBuy",\
          \'totSell\',t."totSell",\
          \'grossProfit\',t."grossProfit",\
          \'profitPercentage\',t."profitPercentage")) as charges\
          from sc_land_quotation_charges as t where t."quotationId" = slq.id) from sc_land_quotations slq where slq."quotationId" = ' +
          id;
        db.query(query).then((data) => {
          db.query(
            "select count(sc_land_quotations.id) from sc_land_quotations"
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
   * @description this method will update Land-Quotation data based on id
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
        landQuotation
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
                landQuotationCharges.update(oldRecord, {
                  where: { id: oldRecord.id },
                });
              });
              newRecords.map((newRecord) => {
                delete newRecord.id;
              });
              landQuotationCharges.bulkCreate(newRecords);
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
   * @description this method will delete Land-Quotation data based on id
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
        landQuotation
          .destroy({
            where: { id: id },
          })
          .then((num) => {
            landQuotationCharges.destroy({
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
