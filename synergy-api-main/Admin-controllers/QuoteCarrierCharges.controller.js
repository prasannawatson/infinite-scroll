const db = require("../db");
var _ = require("lodash");

const QuoteCarrier = require("../Admin-Models/QuoteCarrier.model");
const QuoteCarrierCharges = require("../Admin-Models/QuoteCarrierCharges.model");
const packageWeight = require("../Admin-Models/PackageWeightQuote.model")
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
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclQuotation)
        .then((result) => {
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
   * @method getAll
   * @description this method will fetch all Full Container Load(FCL)-Quotation data
   * @param req
   * @param res
   * @returns void
   */
  packageWeight: async (req, res) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclQuotation)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        db.query(
          'select sqp."packageUnit", sum(sqp."packageWeight")as "packageWeight",\
          sum(sqp."packageVolume") as "packageVolume", si."incoTermName", scc."cargoTypeName", pmt."movementType",\
          sqpw."packageChargeableWeight",coalesce (sqpw.id,0) as "editedId",\
          (select count(sqc2.id) as "carrierCount" from sc_quote_carriers sqc2 where sqc2."quoteId"='+req.params.id+')\
          from sc_quotation_packages sqp left join sc_quotations sq on sq.id = '+req.params.id+'\
          left join sc_cargo_categories scc on scc.id = sq."categoryId"\
          left join sc_incoterms si on si.id = sq."termsId" \
          left join sc_air_quotations saq on saq."quotationId" = sq.id\
          left join pa_movement_type pmt on pmt.id = saq."afExportMovement" \
          left join sc_quote_package_weights sqpw on sqpw."quoteId" ='+req.params.id+'\
          where sqp."quoteIdFk"='+req.params.id+' GROUP BY sqp."packageUnit",\
          si."incoTermName", scc."cargoTypeName" , pmt."movementType",sqpw."packageChargeableWeight",sqpw.id'
        )
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            console.log(err);
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
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclQuotation)
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
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.createFclQuotation)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const quotation = {
          quoteId: req.body.quoteId,
          airlineNameId: req.body.airLineNameId,
          quoteCarrierStatus: req.body.quoteCarrierStatus,
          route: req.body.route,
          directTransitPortId: req.body.directTransitPortId,
          transitDays: req.body.transitDays,
          serviceType: req.body.serviceType,
          carrierNotes: req.body.carrierNotes,
          carrierType: req.body.carrierType,
          createdBy: req.body.createdBy,
          modifiedBy: req.body.modifiedBy,
        };
        await QuoteCarrier.create(quotation)
          .then((data) => {
            let charges = JSON.parse(
              JSON.stringify(req.body.quoteCarrierCharges)
            );
            charges.map((item) => {
              delete item.id;
              delete item.incoTermId;
              delete item.segmentId;
              delete item.movementTypeid;
              item.quoteId = data.quoteId;
              item.quoteCarrierId = data.id;
              item.createdBy = req.body.createdBy;
              item.modifiedBy = req.body.modifiedBy;
            });
            QuoteCarrierCharges.bulkCreate(charges);
            res.send(data);
          })
          .catch((err) => {
            console.log(err);
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
   * @method create
   * @description this method will create new IncoTerm
   * @param req
   * @param res
   * @returns void
   */
  editWeight: async (req, res) => {
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
          quoteId: req.body.quoteId,
          packageChargeableWeight: req.body.packageChargeableWeight,
          status: req.body.status,
          createdBy: req.body.createdBy,
          modifiedBy: req.body.modifiedBy,
        };
        await packageWeight.create(payload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the IncoTerm.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Super Admin Company data based on id
   * @param req
   * @param res
   * @returns void
   */
  updateWeight: async (req, res, next) => {
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
        packageWeight.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Super Admin Company was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Super Admin Company with id=${id}. Maybe Super Admin Company was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Super Admin Company with id=" + id,
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
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclQuotation)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        let query =
          'select sqc.id,sqc."airlineNameId" as "airLineNameId", sqc."route",sqc."directTransitPortId",sqc."serviceType",\
           sqc."carrierType",sqc."createdBy", sqc."quoteCarrierStatus",sqc."carrierNotes",sqc."transitDays",\
            (SELECT json_agg(json_build_object(\
            \'id\',t.id,\
            \'chargeCodeId\', t."chargeCodeId",\
            \'currencyId\',t."currencyId",\
            \'uomId\',t."uomId",\
            \'chargeName\', sc."chargesName" ,\
            \'currencyROE\', sc2."currencyROE",\
            \'buyAmntPrUnit\',t."buyAmntPrUnit",\
            \'sellAmntPrUnit\',t."sellAmntPrUnit",\
            \'PPCC\',t."PPCC",\
            \'chargeTypeId\',sc."chargeTypeId",\
            \'rcvblPartyId\',t."rcvblPartyId",\
            \'pyblPartyId\',t."pyblPartyId",\
            \'minSellAmnt\',t."minSellAmnt",\
            \'totBuy\',t."totBuy",\
            \'totSell\',t."totSell",\
            \'grossProfit\',t."grossProfit",\
            \'uomName\',su."uomName"\
            ) order by sc."chargeTypeId" desc,sc."chargesCode" desc\
            ) as charges\
            from sc_quote_carrier_charges as t left join sc_uoms su on\
            su.id = t."uomId" left join sc_currencies sc2 on sc2.id = t."currencyId"\
            left join sc_charges sc on sc.id = t."chargeCodeId"\
             where t."quoteCarrierId"  = ' + id + ') from sc_quote_carriers sqc where sqc.id = ' + id + 'order by sqc.id';
             db.query(query).then((data) => {
              res.send(data[0]);
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
  carrierCommonCharge: async (req, res, next) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclQuotation)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        let query = 'select sqcc."chargeCodeId", sqcc."currencyId",sqcc."uomId",sc2."currencyROE",sc."chargeTypeId",sqcc."quoteCarrierId",\
        sqcc."minBuyAmnt", sqcc."buyAmntPrUnit", sqcc."sellAmntPrUnit", sqcc."minSellAmnt",su."uomName",\
        sqcc."totBuy", sqcc."totSell", sqcc."grossProfit", sqcc."PPCC",sqcc."rcvblPartyId",sqcc."pyblPartyId"\
        from sc_quote_carrier_charges sqcc left join sc_charges sc on sc.id = sqcc."chargeCodeId"\
        left join sc_currencies sc2 on sc2.id = sc."chargesMCurId"\
        left join sc_uoms su on su.id = sqcc."uomId"\
        where sqcc."quoteId" ='+req.query.quoteId+' and sc."chargeTypeId" = 1 and sqcc."quoteCarrierId" = '+req.query.quoteCarrierId+' \
        GROUP BY sqcc."chargeCodeId",sqcc."currencyId",sqcc."uomId",\
        sqcc."minBuyAmnt", sqcc."buyAmntPrUnit", sqcc."sellAmntPrUnit", sqcc."minSellAmnt",sc."chargeTypeId",\
        sqcc."totBuy", sqcc."totSell", sqcc."grossProfit", sqcc."PPCC",sc2."currencyROE",sqcc."pyblPartyId",\
        sqcc."rcvblPartyId",sqcc."uomId",su."uomName",sqcc."quoteCarrierId"';
        db.query(query).then((data)=>{
          res.send(data[0])
        })
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
  previewPortDet: async (req, res, next) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclQuotation)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        let query =
          'select sq.id, sq."qoutationNumber",sq.freights, sq."portOfLoadingId",sq."portOfDischargeId",sq."termsId",sq."termsId",\
        sq."categoryId",sq."routedBy",\
        (concat( sa."airPortName", \' - \', sa."airPortCode") ) as "portOfLoading",\
        (concat(sa2."airPortName", \' - \', sa2."airPortCode") ) as "portOfDischarge",\
        (concat(sa3."airPortName", \' - \', sa3."airPortCode") ) as "placeOfReciept",\
        (concat(sa4."airPortName", \' - \', sa4."airPortCode") ) as "placeOfDelivery",\
        (select si."incoTermName") as "incoTermName",\
        (select scc."cargoTypeName"),\
        (select sc."customerName"),\
        (select scd."customerCompanyAddress"),\
        (concat(se."empFirstName" ,\' \',se."empLastName")) as "creator",\
        (select se."empEmail"),\
        (select se."empBranchNameId"),\
        (select scb."saBranchName"),\
        (select pmt."movementType"),\
        (concat(scb."saBranchAddress",\', \',sc3."cityName",\', \',ss."stateName",\
        \'-\',scb."saBranchZip",\', \',sc2."countryName"))as "branchAddress",\
        (select scc2."saCompanyLogo")\
        from sc_quotations sq left join sc_airports sa\
        on sa.id = sq."portOfLoadingId" left join sc_airports sa2 on sa2.id = sq."portOfDischargeId"\
        left join sc_airports sa3 on sa3.id = sq."placeOfLoadingId" \
        left join sc_airports sa4 on sa4.id = sq."placeOfDeliveryId"\
        left join sc_incoterms si on si.id = sq."termsId" left join sc_cargo_categories scc on \
        scc.id = sq."categoryId" left join sc_customers sc on sc.id = sq."customerNameIdFk" left join \
        sc_customer_details scd on scd."customerIdFk" = sq."customerNameIdFk" left join \
        sc_employees se on se.id = sq."createdBy" left join sa_company_branches scb on\
        scb.id = se."empBranchNameId" left join sc_states ss on ss.id = scb."saBranchStateId" \
        left join sc_countries sc2 on sc2.id = scb."saBranchCountryId" \
        left join sa_country_companies scc2 on scc2.id = scb."saCompanyCountryId"\
        left join sc_air_quotations saq on saq."quotationId" = sq.id \
        left join pa_movement_type pmt on pmt.id = saq."afExportMovement"\
        left join sc_cities sc3 on sc3.id = scb."saBranchCityId" where sq.id=' +
          id;
        db.query(query).then((data) => {
          const response = {
            data: data[0],
          };
          res.send(response);
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
  previewChargeDet: async (req, res, next) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclQuotation)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const carrierId = req.query.carrierId;
        const quoteId = req.query.quoteId;
        let query =
          'select sqc.id,sqc."route",sqc."airlineNameId", sqc."createdBy", sqc."quoteCarrierStatus",sq."routedBy",\
        sac."airLineName",sq."routedBy",\
        (SELECT json_agg(json_build_object(\
            \'id\',t.id,\
            \'chargeCodeId\', sc."chargesName",\
            \'uomName\', su."uomName",\
            \'sellRate\',t."sellAmntPrUnit",\
            \'currency\', sc2."currencyCode",\
            \'currencyROE\', sc2."currencyROE",\
            \'minSellRate\', t."minSellAmnt",\
            \'totSell\',t."totSell",\
            \'usdROE\',sc3."currencyROE"\
            )) as charges\
            from sc_quote_carrier_charges as t left join sc_charges sc on sc.id = t."chargeCodeId"\
            left join sc_uoms su on su.id = t."uomId" \
            left join sc_currencies sc2 on sc2.id = t."currencyId"\
            left join sc_currencies sc3 on sc3."currencyCode" = \'USD\'\
            where t."quoteCarrierId" = ' +
          carrierId +
          ' and t."quoteId"=' +
          quoteId +
          ') \
            from sc_quote_carriers sqc left join sc_airline_carriers sac on sac.id = sqc."airlineNameId" \
            left join sc_quotations sq on sq.id = sqc."quoteId" \
            where sqc.id = ' +
          carrierId +
          ' and sqc."quoteId" = ' +
          quoteId;
        db.query(query).then((data) => {
          const response = {
            data: data[0],
          };
          res.send(response);
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Full Container Load(FCL)-quotation data based on id
   * @param req
   * @param res
   * @returns void
   */
  previewPackageDet: async (req, res, next) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclQuotation)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        let query =
          'select sqp."packageTypeFk", sqp."noOfPackages", sqp."packageWeight", sqp."packageLength",sqp."packageWidth",sqp."packageUnit" ,\
        (select spt."packageName") as "packageName",\
        sqp."packageHeight",sqp."packageVolume" from sc_quotation_packages sqp left join sc_package_tbls spt\
        on spt.id = sqp."packageTypeFk" where sqp."quoteIdFk" =' + id;
        db.query(query).then((data) => {
          const response = {
            data: data[0],
          };
          res.send(response);
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
  getCarrier: async (req, res, next) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclQuotation)
        .then((result) => {
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
          'select sqc.id, sqc."quoteId", sqc."airlineNameId", sqc."carrierType", sqc."quoteCarrierStatus", \
        case when CAST(coalesce(sqc."quoteCarrierStatus") AS varchar) = \'OPEN\' then true when\
        CAST(coalesce(sqc."quoteCarrierStatus") AS varchar) = \'MAIL SENT\' then true \
        end as "status",\
        (select sac."airLineName") as "airLineName"\
        from sc_quote_carriers sqc left join sc_airline_carriers sac on sac.id = sqc."airlineNameId" where sqc."quoteId"= ' +
          id +
          " and";
        if (search.airLineName !== null && search.airLineName !== "") {
          query +=
            ' LOWER("airLineName") like \'%' +
            search.airLineName.toLowerCase() +
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
              'select count(sqc.id) from sc_quote_carriers sqc where sqc."quoteId"= ' +
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
              message:
                err.message || "Some error occurred while retrieving Charges.",
            });
          });
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Full Container Load(FCL)-quotation data based on id
   * @param req
   * @param res
   * @returns void
   */
  countCarrier: async (req, res, next) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclQuotation)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        let query =
          'select count(sqc."quoteId")  from sc_quote_carriers sqc where sqc."quoteId" ='+id;
        db.query(query)
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
      console.log(error);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Full Container Load(FCL)-quotation data based on id
   * @param req
   * @param res
   * @returns void
   */
  getCarrierPreview: async (req, res, next) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclQuotation)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        let query =
          'select sqc.id, sqc."quoteId", sqc."airlineNameId", sqc."quoteCarrierStatus", \
        (select sac."airLineName") as "airLineName"\
        from sc_quote_carriers sqc left join sc_airline_carriers sac on sac.id = sqc."airlineNameId" where sqc."quoteId"=' +
          id +
          ' and sqc."quoteCarrierStatus" = \'OPEN\' \
        or sqc."quoteCarrierStatus" = \'MAIL SENT\' and sqc."quoteId"= ' +
          id +
          ' or sqc."quoteCarrierStatus" = \'APPROVED\' and sqc."quoteId"=' +
          id;
        db.query(query)
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Charges.",
            });
          });
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Full Container Load(FCL)-quotation data based on id
   * @param req
   * @param res
   * @returns void
   */
  getAirLines: async (req, res, next) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclQuotation)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        let query =
          'select ssr."airLineCarrierId" as "id", ssr."buyRate" as "buyAmntPrunit",\
        ssr."minSellRate" as "sellAmntPrUnit", ssr."sellRate" as "minSellAmnt", ssr."rateType" ,\
        concat(sac."airLineName",\' (\', sac."airLineCountry",\')\') as "airLineName",sc."chargeTypeId",\
        (select sc.id) as "chargeId",\
        (select sc."chargesName") as "chargeName",\
        (select sc."chargesMCurId") as "currId",\
        (select scm."chargeUOMFk")as "uomId",\
        (select sc2."currencyROE") as "currencyROE",\
        (select su."uomName"),\
        coalesce (sqc."airlineNameId",0) as "airLineNameId",\
        coalesce (sqc."id",0) as "quotePId",\
        (select sum(sqcc."totSell") from sc_quote_carrier_charges sqcc where sqcc."quoteCarrierId"=sqc.id) as "totalValue",\
        (select sum(sqcc."grossProfit") from sc_quote_carrier_charges sqcc where sqcc."quoteCarrierId"=sqc.id) as profit,\
        (select sum(sqcc."totBuy") from sc_quote_carrier_charges sqcc where sqcc."quoteCarrierId"=sqc.id) as "totalValueBuy",\
        case WHEN sqc."airlineNameId" IS NOT NULL THEN true ELSE false END AS "quoteSaved"\
        from sc_slab_rates ssr left join sc_airline_carriers sac on\
        sac.id = ssr."airLineCarrierId" left join sc_charges sc on\
        sc."chargesName" = \'AIR FREIGHT CHARGES\' left join sc_charges_mappings scm on scm.id = sc.id \
        left join sc_currencies sc2 on sc2.id = sc."chargesMCurId"\
        left join sc_uoms su on su.id = scm."chargeUOMFk"\
        left join sc_quote_carriers sqc on sqc."airlineNameId" = ssr."airLineCarrierId"and sqc."quoteId" ='+req.query.quoteId+'\
        where ssr."polId" = ' +
          req.query.POL +
          ' and\
        ssr."podId" = ' +
          req.query.POD +
          " and " +
          req.query.weight +
          ' between ssr."fromKg" and ssr."toKg"';
        db.query(query)
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Charges.",
            });
          });
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Full Container Load(FCL)-quotation data based on id
   * @param req
   * @param res
   * @returns void
   */
  loadOwnAirlines: async (req, res, next) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclQuotation)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        let query =
          'select sqc.id,sqc.id as "quotePId",sqc."airlineNameId", sqc."quoteCarrierStatus" , sqc."serviceType" ,\
          case WHEN sqc."airlineNameId" IS NOT NULL THEN true ELSE false END AS "quoteSaved",\
          concat(sac."airLineName" ,\'(\',sac."airLineCountry",\')\') as "airLineName"\
          from sc_quote_carriers sqc \
          left join sc_airline_carriers sac on sac.id = sqc."airlineNameId" \
          where sqc."quoteId" ='+req.query.quoteId+' and sqc."carrierType" = \'OWN\'';
        db.query(query)
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Charges.",
            });
          });
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Full Container Load(FCL)-quotation data based on id
   * @param req
   * @param res
   * @returns void
   */
  loadSavedAirLines: async (req, res, next) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclQuotation)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        let query =
          'select sqc."airlineNameId" as id from sc_quote_carriers sqc where sqc."quoteId" =' +
          req.query.quoteId;
        db.query(query)
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Charges.",
            });
          });
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Full Container Load(FCL)-quotation data based on id
   * @param req
   * @param res
   * @returns void
   */
  getVendors: async (req, res, next) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.viewFclQuotation)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        let query =
          "select sc.\"id\", sc.\"customerName\", sc.\"customerCode\", scd.\"vendorParty\",\
        case WHEN scd.\"vendorParty\"->>'warehouse' = 'true' THEN 'Warehouse, ' ELSE '' END ||\
        case WHEN scd.\"vendorParty\"->>'agent' = 'true' THEN 'Agent, ' ELSE '' END ||\
        case WHEN scd.\"vendorParty\"->>'airline' = 'true' THEN 'Airline, ' ELSE '' END ||\
        case WHEN scd.\"vendorParty\"->>'trucker' = 'true' THEN 'Trucker, ' ELSE '' END ||\
        case WHEN scd.\"vendorParty\"->>'coloader' = 'true' THEN 'Coloader, ' ELSE '' END ||\
        case WHEN scd.\"vendorParty\"->>'terminal' = 'true' THEN 'Terminal, ' ELSE '' END ||\
        case WHEN scd.\"vendorParty\"->>'customsBroker' = 'true' THEN 'Customs Broker, ' ELSE '' END AS \"vendorServices\" \
        from sc_customers sc join sc_customer_details scd on sc.id = scd.\"customerIdFk\" \
        where scd.\"vendorParty\" ->'warehouse' = 'true' or scd.\"vendorParty\" ->'agent' = 'true' or scd.\"vendorParty\" ->'airline'= 'true' \
        or scd.\"vendorParty\" ->'trucker'= 'true' or scd.\"vendorParty\" ->'coloader'= 'true' or \
        scd.\"vendorParty\" ->'terminal'= 'true' or scd.\"vendorParty\" ->'customsBroker'= 'true' ";
        db.query(query)
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Charges.",
            });
          });
      }
    } catch (error) {
      console.log(error);
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
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.editFclQuotation)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = Number(req.params.id);
        const payload = {
          quoteId: req.body.quoteId,
          airlineNameId: req.body.airLineNameId,
          quoteCarrierStatus: req.body.quoteCarrierStatus,
          route: req.body.route,
          directTransitPortId: req.body.directTransitPortId,
          transitDays: req.body.transitDays,
          serviceType: req.body.serviceType,
          carrierNotes: req.body.carrierNotes,
        };
        QuoteCarrier.update(payload, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              let charges = req.body.quoteCarrierCharges;
              charges = charges;
              charges.map((item) => {
                item.quoteCarrierId = id;
              });
              const oldRecords = charges.filter((item) => {
                return item?.id > 0;
              });
              const newRecords = charges.filter((item) => {
                return typeof item?.id === "undefined";
              });
              oldRecords.forEach((oldRecord) => {
                QuoteCarrierCharges.update(oldRecord, {
                  where: { id: oldRecord.id },
                });
              });
              newRecords.map((newRecord) => {
                newRecord.quoteId = req.body.quoteId;
                newRecord.createdBy = req.body.createdBy;
                newRecord.modifiedBy = req.body.modifiedBy;
              });
              QuoteCarrierCharges.bulkCreate(newRecords);
              res.send({
                message: "Quotation was updated successfully.",
              });
            } else {
              // console.log(error);
              res.send({
                message: `Cannot update Quotation with id=${id}. Maybe Quotation was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            console.log(err);
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
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.deleteFclQuotation)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
              QuoteCarrierCharges.destroy({
                where: { id: id },
              }).then((num) => {
                res.send({
                  message: "Quote charges was deleted successfully!",
                });
              })
          .catch((err) => {
            console.log(err)
            res.status(500).send({
              message: "Could not delete unitOfMeasurment with id=" + id,
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
  deleteFromCarrier: async (req, res, next) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.deleteFclQuotation)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
              QuoteCarrier.destroy({
                where: { id: id },
              }).then((num) => {
                if(num==1){
                  QuoteCarrierCharges.destroy({
                    where : {quoteCarrierId:id}
                  }) 
                res.send({
                  message: "Quote charges was deleted successfully!",
                });
              }
              })
          .catch((err) => {
            console.log(err)
            res.status(500).send({
              message: "Could not delete unitOfMeasurment with id=" + id,
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
  deleteAllCarrier: async (req, res, next) => {
    try {
      const auth = await authController
        .authorizeTokenWithAbility(req, roles.deleteFclQuotation)
        .then((result) => {
          return result;
        });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
              QuoteCarrier.destroy({
                where: { quoteId: id },
              }).then((num) => {
                if(num==1){
                  QuoteCarrierCharges.destroy({
                    where : {quoteId:id}
                  }) 
                res.send({
                  message: "Quote charges was deleted successfully!",
                });
              }
              })
          .catch((err) => {
            console.log(err)
            res.status(500).send({
              message: "Could not delete unitOfMeasurment with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
