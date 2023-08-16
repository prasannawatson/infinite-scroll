const db = require("../db");
var _ = require("lodash");
const roles = require("../roles");  
const airQuotation = require('../User-Models/AfQuotation.model')
const airQuotationCharges = require("../User-Models/AirQuotationCharges.model");
const authController = require("../User-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all  Air-Freight Quotation data
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
        airQuotation
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
   * @description this method will Find and Show all Air-Freight Quotation data
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
          'select *, (SELECT json_agg(json_build_object(\
          \'id\',t.id,\
          \'quotationId\',t."quotationId",\
          \'afChargeCode\',t."afChargeCode",\
          \'afChargeName\',t."afChargeName",\
          \'afChargeType\',t."afChargeType", \
          \'afCurrency\',t."afCurrency", \
          \'afUOM\',t."afUOM",\
          \'afMinBuyAmnt\',t."afMinBuyAmnt",\
          \'buyAmntPrUnit\',t."buyAmntPrUnit",\
          \'afMinSellAmnt\',t."afMinSellAmnt",\
          \'sellAmntPrUnit\',t."sellAmntPrUnit",\
          \'totBuy\',t."totBuy",\
          \'totSell\',t."totSell",\
          \'grossProfit\',t."grossProfit",\
          \'profitPercentage\',t."profitPercentage")) as charges\
          from sc_air_quotation_charges as t where t."quotationId" = sfq.id) from sc_air_quotations sfq ';
        db.query(query)
          .then((data) => {
            db.query(
              "select count(sc_air_quotations.id) from sc_air_quotations"
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
   * @description this method will create new Air-Freight quotation
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
          afPlaceOfRecieptFk: req.body.afPlaceOfRecieptFk,
          afPortOfLoadingFk: req.body.afPortOfLoadingFk,
          afPortOfLoadingFk: req.body.afPortOfLoadingFk,
          afPortOfDeliveryFk: req.body.afPortOfDeliveryFk,
          afPlaceOfDeliveryFk: req.body.afPlaceOfDeliveryFk,
          afTermsFk: req.body.afTermsFk,
          PPCC: req.body.PPCC,
          afExportMovement: req.body.afExportMovement,
          afPickupAddress: req.body.afPickupAddress,
          afDeliveryAddress: req.body.afDeliveryAddress,
          afCommodity: req.body.afCommodity,
          afConsignor: req.body.afConsignor,
          afConsignee: req.body.afConsignee,
          afControllingParty: req.body.afControllingParty,
          insuranceValue: req.body.insuranceValue,
          cargoValue: req.body.cargoValue,
          afFreightStatus: req.body.afFreightStatus,
        };
        await airQuotation
          .create(quotation)
          .then((data) => {
            // let charges = JSON.parse(JSON.stringify(req.body.charges));
            // charges.map((item) => {
            //   delete item.id;
            //   item.quotationId = data.id;
            // });
            // airQuotationCharges.bulkCreate(charges);
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
   * @description this method will Find and Show Air-Freight quotation data based on id
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
          'select saq.id , saq."quotationId", saq."afPlaceOfRecieptFk", saq."afPortOfLoadingFk", \
          saq."afPortOfDeliveryFk", saq."afPlaceOfDeliveryFk", saq."afTermsFk", saq."PPCC", saq."afExportMovement",\
          saq."afPickupAddress", saq."afDeliveryAddress", saq."afCommodity", saq."afConsignor", saq."afConsignee", \
          saq."afControllingParty", saq."insuranceValue", saq."cargoValue", saq."afFreightStatus", saq."createdBy",saq."modifiedBy" ,\
          pmt."movementType", scc."cargoTypeName", si."incoTermName",coalesce (sqc.id,0) as "carrierCount" \
          from sc_air_quotations saq left join pa_movement_type pmt on pmt.id = saq."afExportMovement" \
          left join sc_quotations sq on sq.id = saq."quotationId" \
          left join sc_cargo_categories scc on scc.id = sq."categoryId" \
          left join sc_incoterms si on si.id = sq."termsId" \
          left join sc_quote_carriers sqc on sqc."quoteId" =' +id+ '\
          where saq."quotationId" ='+ id;
        db.query(query).then((data) => {
          db.query(
            "select count(sc_air_quotations.id) from sc_air_quotations"
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
   * @description this method will update Air-Freight quotation data based on id
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
        airQuotation
          .update(req.body, {
            where: { id: id },
          })
          .then((num) => {
            if (num == 1) {
              // const quoteId = req.body.quotationId;
              // let charges = JSON.parse(JSON.stringify(req.body.charges));
              // charges.map((item) => {
              //   item.quotationId = quoteId;
              // });
              // const oldRecords = charges.filter((item) => { return item?.id > 0 });
              // const newRecords = charges.filter((item) => { return item?.id <= 0 });
              // oldRecords.forEach(oldRecord => {
              //   airQuotationCharges.update(oldRecord, {
              //     where: { id: oldRecord.id },
              //   })
              // });
              // newRecords.map((newRecord) => {
              //   delete newRecord.id;
              // })
              // airQuotationCharges.bulkCreate(newRecords);
              res.send({
                message: "Quotation was updated successfully.",
              });
            } else {
              console.log(err)
              res.send({
                message: `Cannot update Quotation with id=${id}. Maybe Quotation was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            console.log(err)
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
   * @description this method will delete Air-Freight Quotation data based on id
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
        airQuotation
          .destroy({
            where: { id: id },
          })
          .then((num) => {

            // airQuotationCharges.destroy({
            //   where: { quotationId: id },
            // });
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

  // /**
  //  * @method find
  //  * @description this method will Find and Show Preview of Air-Freight quotation data based on id
  //  * @param req
  //  * @param res
  //  * @returns void
  //  */
  // getQuoteForPreview: async (req, res, next) => {
  //   try {
  //     const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclQuotation).then((result) => {
  //       return result;
  //     });
  //     if (!auth) {
  //       res.status(401).send({
  //         message: "Unauthorized.",
  //       });
  //     } else {
  //       const id = req.params.id;
  //       let query =
  //         'select sq.id,sq."qoutationNumber",sq."routedBy",sq.freights,sq."validFrom",sq."validTill",\
  //       sq."freightStatus",\
  //       (select sc."customerName") as "customerName",\
  //       (select sc2."countryName")as "custCountryName",\
  //       (concat(sc3."carrierName",\' - \', sc3."carrierCode")  ) as "carrierName",\
  //       (concat(ss."seaPortName",\' - \',ss."seaPortCountry",\' (\',ss."seaPortCode",\')\'))as "portOfLoading",\
  //       (concat(ss2."seaPortName",\' - \',ss2."seaPortCountry",\' (\',ss2."seaPortCode",\')\'))as "portOfDelivery",\
  //       (select si."incoTermName") as "incoterName",\
  //       (select su."uomName") as "uomName",\
  //       saq."noOfPackages",saq."weightKgs",saq."weightLbs",saq."lengthCm",saq."lengthInches",saq."widthCm",saq."widthInches",\
  //       saq."heightCm",saq."heightInches",saq.volume,saq."chargeableKgs",saq."chargeableLbs",saq."drtTrnst" \
  //       from sc_quotations sq left join sc_customers sc on sc.id = sq."customerNameIdFk"\
  //       inner join sc_countries sc2  on sc2."id" = sc."customerCountryIdFk" join sc_air_quotations saq \
  //       on saq."quotationId" = sq.id join sc_carriers sc3 on sc3.id =saq."afCarrierFk" \
  //       join sc_seaports ss on ss.id = saq."afPortOfLoadingFk" join sc_seaports ss2 on \
  //       ss2.id = saq."afPortOfDeliveryFk" join sc_incoterms si on si.id =saq."afTermsFk" join sc_uoms su on\
  //       su.id = saq."uomChargeable" where sq.id ='+
  //         id;
  //       db.query(query).then((data) => {
  //         db.query(
  //           "select count(sc_air_quotations.id) from sc_air_quotations"
  //         ).then((count) => {
  //           const response = {
  //             count: count[0][0].count,
  //             data: data[0],
  //             currentPage: req.query.currentPage,
  //             limit: req.query.limit,
  //           };
  //           res.send(response.data);
  //         });
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // },

  // /**
  //  * @method find
  //  * @description this method will Find and Show Preview of Air-Freight quotation Charges data based on id
  //  * @param req
  //  * @param res
  //  * @returns void
  //  */
  // getQuoteForPreviewCharge: async (req, res, next) => {
  //   try {
  //     const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclQuotation).then((result) => {
  //       return result;
  //     });
  //     if (!auth) {
  //       res.status(401).send({
  //         message: "Unauthorized.",
  //       });
  //     } else {
  //       const id = req.params.id;
  //       let query =
  //         'select saqc.id ,saqc."quotationId",saqc."afChargeName",saqc."afMinSellAmnt",saqc."totSell",\
  //       (select su."uomName")\
  //       from sc_air_quotation_charges saqc join sc_uoms su on su.id = saqc."afUOM" where saqc."quotationId" ='+ id;
  //       db.query(query).then((data) => {
  //         db.query(
  //           "select count(sc_air_quotation_charges.id) from sc_air_quotation_charges"
  //         ).then((count) => {
  //           const response = {
  //             count: count[0][0].count,
  //             data: data[0],
  //             currentPage: req.query.currentPage,
  //             limit: req.query.limit,
  //           };
  //           res.send(response.data);
  //         });
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // },

  /**
   * @method getSalesMan
   * @description this method will fetch SalesManMapping data based on id
   * @param req
   * @param res
   * @returns void
   */
  getSalesMan: async (req, res, next) => {
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
        db.query(`select ssm.id , se.id,\
        concat(se."empFirstName",'-',se."empLastName",'(',ssm.priority,')') as "employeeName"\
        from sc_salesman_mappings ssm,sc_employees se where se.id = ssm."employeeId" and ssm."companyId" =(:id)`,{
          replacements:{id:req.params.id}
        })
          .then((data) => {
            if (data) {
              res.send(data[0]);
            } else {
              res.status(404).send({
                message: `Cannot find SalesManMapping with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving SalesManMapping with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
