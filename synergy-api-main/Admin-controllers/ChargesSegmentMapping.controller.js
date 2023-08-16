const db = require("../db");
var _ = require("lodash");
const ChargesSegmentMapping = require("../Admin-Models/ChargesSegementMapping.model");
const authController = require("../Admin-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all ChargesMapping data
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
        db.query(
          'select \
                    scm."id",\
                    "chargeNameFk" ,\
                    "chargeContainerIdFk" ,\
                    "chargeCategoryFk" ,\
                    "chargeUOMFk" ,\
                    su."uomName" as "uomName",\
                    sc."chargesName" as "chargesName",\
                    scm."status" as "status",\
                    case when CAST(coalesce(scm."chargeCategoryFk", \'0\') AS integer) = 1 then \'Air\'  when CAST(coalesce(scm."chargeCategoryFk", \'0\') AS integer) = 2 then \'Ocean\' else \'All\' end as "chargeCategory"\
                    from sc_charges_mappings scm \
                    join sc_charges sc on sc.id = scm."chargeNameFk" \
                    join sc_uoms su on su.id = scm."chargeUOMFk" '
        )
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving ChargesSegmentMapping.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getChargesQuote
   * @description this method will fetch all ChargesMapping data
   * @param req
   * @param res
   * @returns void
   */
  getChargesQuote: async (req, res) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        console.log("Incoterm -> ",req.query.incoTerm,
        "Movement -> ",req.query.movement,
        "Air Line -> ",req.query.airLineId,
        "Cargo Type -> ",req.query.cargoTypeId,)
        db.query(
          'SELECT *\
          FROM (\
              SELECT scsm."chargeCodeId", scsm."movementTypeId", scsm."currencyId",\
              scsm."uomId", scsm."minBuyAmnt", scsm."buyAmntPrUnit", scsm."minSellAmnt",\
              scsm."sellAmntPrUnit", scsm."airLineId", scsm."cargoTypeId", scsm."chargeTypeId",\
              (SELECT sc."currencyROE") AS "currencyROE",\
              (SELECT su."uomName"),\
              (SELECT sc2."chargesName") AS "chargeName",\
              ROW_NUMBER() OVER (PARTITION BY scsm."chargeCodeId" ORDER BY scsm."cargoTypeId") AS row_num\
              FROM sc_charges_segment_mappings scsm \
              LEFT JOIN sc_uoms su ON su.id = scsm."uomId"\
              LEFT JOIN sc_currencies sc ON sc.id = scsm."currencyId"\
              LEFT JOIN sc_charges sc2 ON sc2.id = scsm."chargeCodeId"\
              WHERE ( \
                ( scsm."incoTermId" = '+req.query.incoTerm+' and scsm."movementTypeId" = '+req.query.movement+' and scsm."cargoTypeId" = '+req.query.cargoTypeId+' AND scsm."chargeTypeId" = 1)\
                  OR (scsm."incoTermId" = '+req.query.incoTerm+' and scsm."movementTypeId" = '+req.query.movement+' and scsm."cargoTypeId" = 7 AND scsm."chargeTypeId" = 1)\
                  OR (scsm."incoTermId" = '+req.query.incoTerm+' and scsm."movementTypeId" = '+req.query.movement+' and scsm."cargoTypeId" = 7 AND scsm."chargeTypeId" = 1) \
                  OR(scsm."incoTermId" = '+req.query.incoTerm+' and scsm."movementTypeId" = '+req.query.movement+' and scsm."airLineId" = '+req.query.airLineId+' AND scsm."chargeTypeId" = 2 AND scsm."cargoTypeId" = '+req.query.cargoTypeId+') \
                  OR (scsm."incoTermId" = '+req.query.incoTerm+' and scsm."movementTypeId" = '+req.query.movement+' and scsm."airLineId" = '+req.query.airLineId+' AND scsm."chargeTypeId" = 2 AND scsm."cargoTypeId" = 7) \
              ) order by scsm."chargeTypeId" desc\
          ) AS subquery\
          WHERE row_num = 1;'
          )
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            console.log(err)
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving ChargesSegmentMapping.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method findAndCountAll
   * @description this method will fetch and show all Seaport data
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
          'select scsm.id, scsm."segmentId", scsm."chargeCodeId", scsm."incoTermId",scsm."movementTypeId",scsm."cargoTypeId",\
          scsm."currencyId", scsm."uomId", scsm."placeOfRecieptId", scsm."portOfLoadingId", scsm."portOfDischargeId",\
          scsm."placeOfDeliveryId", scsm."minBuyAmnt", scsm."buyAmntPrUnit",scsm."minSellAmnt", scsm."sellAmntPrUnit",scsm."airLineId",\
          scsm."validTill", scsm."validTill", scsm.status,scsm."chargeTypeId",\
          (select ps."segmentName") as segment,\
          concat(sc."chargesName", \' - \',sc."chargesCode") as charges,\
          (select si."incoTermName" ) as "incoTerm",\
          (select pmt."movementType") as "movementType",\
          (select sc2."currencyCode") as currency,\
          (select su."uomName") as uom,\
          concat(ss."seaPortName",\'-\',ss."seaPortCountry")  as "placeOfReciept"\
          from sc_charges_segment_mappings scsm left join pa_segments ps on\
          ps.id = scsm."segmentId" left join sc_charges sc on sc.id = scsm."chargeCodeId" left join sc_incoterms si on\
          si.id = scsm."incoTermId" left join pa_movement_type pmt on pmt.id = scsm."movementTypeId" left join sc_currencies sc2 \
          on sc2.id = scsm."currencyId" left join sc_uoms su on su.id = scsm."uomId" \
          left join sc_seaports ss on ss.id = scsm."placeOfRecieptId" WHERE scsm."globalCompanyId"='+req.query.companyId+' and'; 
        if (search.charges !== null && search.charges !== "") {
          query += ' LOWER(sc."chargesName") like \'%' + search.charges.toLowerCase() + "%' and";
          query += ' LOWER(sc."chargesName") like \'%' + search.charges.toLowerCase() + "%' and";
        }
        if (search.segment !== null && search.segment !== "") {
          query += ' LOWER(sc."segment") like \'%' + search.segment.toLowerCase() + "%' and ";
        }
        if (search.uom !== null && search.uom !== "") {
          query += ' LOWER(su."uomName") like \'%' + search.uom.toLowerCase() + "%' and ";
        }
        if (search.incoTerm !== null && search.incoTerm !== "") {
          query += ' LOWER(si."incoTermName") like \'%' + search.incoTerm.toLowerCase() + "%' and ";
        }
        if (search.movementType !== null && search.movementType !== "") {
          query += ' LOWER(pmt."movementType") like \'%' + search.movementType.toLowerCase() + "%' and ";
        }
        if (search.incoTerm !== null && search.incoTerm !== "") {
          query += ' LOWER(si."incoTermName") like \'%' + search.incoTerm.toLowerCase() + "%' and ";
        }
        if (search.movementType !== null && search.movementType !== "") {
          query += ' LOWER(pmt."movementType") like \'%' + search.movementType.toLowerCase() + "%' and ";
        }
        query += " true LIMIT " + req.query.limit + " OFFSET " + req.query.limit * req.query.currentPage;

        db.query(query)
          .then((data) => {
            db.query(
              "select count(sc_charges_segment_mappings.id) from sc_charges_segment_mappings"
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
            console.log(err)
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



  viewChargeSegmapping: async (req, res) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.query.id;
        let query =
          'select  scsm.id, scsm."segmentId", scsm."chargeCodeId", scsm."incoTermId",scsm."movementTypeId",scsm."cargoTypeId",\
          scsm."currencyId", scsm."uomId", scsm."placeOfRecieptId", scsm."portOfLoadingId", scsm."portOfDischargeId",\
          scsm."placeOfDeliveryId", scsm."minBuyAmnt", scsm."buyAmntPrUnit",scsm."minSellAmnt", scsm."sellAmntPrUnit",scsm."airLineId",\
          scsm."validTill", scsm."validTill", scsm.status,scsm."chargeTypeId",\
          (select ps."segmentName") as segment,\
          coalesce(sac."airLineName",\'-\' )as airline ,\
          concat(sc."chargesName", \' - \',sc."chargesCode") as charges,\
          (select si."incoTermName" ) as "incoTerm",\
          (select scc."cargoTypeName"),\
          (select sct."chargeTypeName"),\
          (select pmt."movementType") as "movementType",\
          (select sc2."currencyCode") as "currency",\
          (select su."uomName") as uom\
          from sc_charges_segment_mappings scsm \
          left join pa_segments ps on ps.id = scsm."segmentId" \
          left join sc_airline_carriers sac on sac.id =scsm."airLineId"  \
          left join sc_cargo_categories scc  on scc.id = scsm."cargoTypeId"\
          left join sc_charges sc on sc.id = scsm."chargeCodeId" \
          left join sc_incoterms si on si.id = scsm."incoTermId" \
          left join sc_charge_types sct on sct.id = scsm ."chargeTypeId"\
          left join pa_movement_type pmt on pmt.id = scsm."movementTypeId" \
          left join sc_currencies sc2 on sc2.id = scsm."currencyId" \
          left join sc_uoms su on su.id = scsm."uomId" \
          WHERE scsm.id=' + id +'and scsm."globalCompanyId"='+req.query.companyGlobalId; 
        db.query(query)
          .then((data) => {
              res.send(data[0]);
          })
          .catch((err) => {
            console.log(err)
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
   * @description this method will create new ChargesMapping
   * @param req
   * @param res
   * @returns void
   */
  create: async (req, res) => {
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
          segmentId: req.body.segmentId,
          airLineId:req.body.airLineId,
          cargoTypeId:req.body.cargoTypeId,
          chargeTypeId: req.body.chargeTypeId,
          chargeCodeId: req.body.chargeCodeId,
          incoTermId: req.body.incoTermId,
          movementTypeId: req.body.movementTypeId,
          currencyId: req.body.currencyId,
          uomId: req.body.uomId,
          placeOfRecieptId: req.body.placeOfRecieptId,
          portOfLoadingId: req.body.portOfLoadingId,
          portOfDischargeId: req.body.portOfDischargeId,
          placeOfDeliveryId: req.body.placeOfDeliveryId,
          validTill: req.body.validTill,
          minBuyAmnt: req.body.minBuyAmnt,
          buyAmntPrUnit: req.body.buyAmntPrUnit,
          minSellAmnt: req.body.minSellAmnt,
          sellAmntPrUnit: req.body.sellAmntPrUnit,
          createdBy: req.body.createdBy,
          modifiedBy: req.body.modifiedBy,
          globalCompanyId: req.body.globalCompanyId,
          branchCountryId: req.body.branchCountryId,
          branchNameId: req.body.branchNameId,
          status: req.body.status,
        };
        console.log(payload)
        await ChargesSegmentMapping.create(payload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            console.log(err)
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the ChargesSegmentMapping.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will fetch ChargesMapping data based on id
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
        ChargesSegmentMapping.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find ChargesMapping with id=${id}.`,
              });
            }
          })
          .catch((err) => {
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
   * @method find
   * @description this method will fetch ChargesMapping data based on id
   * @param req
   * @param res
   * @returns void
   */
  loadSegments: async (req, res, next) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {db.query(
        'select ps.id, ps."segmentCode", ps."segmentName",\
        concat(ps."segmentCode", \' - \', ps."segmentName") as segment  from pa_segments ps '
      )
        .then((data) => {
          res.send(data[0]);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while retrieving ChargesSegmentMapping.",
          });
        });
    }
  } catch (error) {
    console.log(error.message);
  }
},

/**
   * @method find
   * @description this method will fetch ChargesMapping data based on id
   * @param req
   * @param res
   * @returns void
   */
loadMovement: async (req, res, next) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {db.query(
        'select * from pa_movement_type'
      )
        .then((data) => {
          res.send(data[0]);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while retrieving ChargesSegmentMapping.",
          });
        });
    }
  } catch (error) {
    console.log(error.message);
  }
},

  /**
   * @method update
   * @description this method will update ChargesMapping data based on id
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
        console.log(id)
        ChargesSegmentMapping.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "ChargesMapping was updated successfully.",
              });
            } else {
              console.log(err)
              res.send({
                message: `Cannot update ChargesMapping with id=${id}. Maybe ChargesMapping was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            console.log(err)
            res.status(500).send({
              message: "Error updating ChargesMapping with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete ChargesMapping data based on id
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
        ChargesSegmentMapping.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "ChargesMapping was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete ChargesMapping with id=${id}. Maybe ChargesMapping was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete ChargesMapping with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
