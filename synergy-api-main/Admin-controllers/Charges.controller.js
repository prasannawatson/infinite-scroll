const db = require("../db");
var _ = require("lodash");
const Charges = require("../Admin-Models/Charges.model");
const authController = require("../Admin-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Charges data
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
          'select sc.id , sc."chargesCode", sc."chargesName", sc."chargesStatus",sc."createdBy",\
          sc."modifiedBy",sc."chargeTypeId", sct."chargeTypeName",\
          concat(sc."chargesName", \' - \',sc."chargesCode" ) as "chargeCodeName" from sc_charges sc\
          left join sc_charge_types sct on sct.id = sc."chargeTypeId";'
        )
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


     viewallcharge: async (req, res) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const  id = req.params.id
        db.query(
          'select\
          sc.id , sc."chargesCode", sc."chargesName",sc."chargesStatus",sc."createdBy",\
          sc."modifiedBy",sc."chargeTypeId", sct."chargeTypeName",sc."carrierTypeId", sc."uomId",sc."chargesMCurId",\
          su."uomName" ,sc2."currencyCode",\
          sct2."carrierTypeName",\
          COALESCE(sc3."containerName",\'-\') as "containerName"\
          from sc_charges sc\
          left join sc_uoms su  on su.id =sc."uomId" \
          left join sc_carrier_types sct2 on sct2.id =sc."carrierTypeId"  \
          left join  sc_currencies sc2 on sc2.id =sc."chargesMCurId" \
          left join sc_containers sc3 on sc3.id = sc."containerTypeId" \
          left join sc_charge_types sct on sct.id = sc."chargeTypeId" where  sc.id =' + id 
        )
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
   * @method getAll
   * @description this method will fetch all Charges data
   * @param req
   * @param res
   * @returns void
   */
  getFreightCharges: async (req, res) => {
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
          'select sc.id , sc."chargesCode", sc."chargesName", sc."chargesStatus",sc."createdBy",\
          sc."modifiedBy",sc."chargeTypeId", sct."chargeTypeName",\
          concat(sc."chargesName", \' - \',sc."chargesCode" ) as "chargeCodeName" from sc_charges sc\
          left join sc_charge_types sct on sct.id = sc."chargeTypeId" where sc."chargeTypeId" = 2;'
        )
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
   * @method getAll
   * @description this method will fetch all Charges data
   * @param req
   * @param res
   * @returns void
   */
  getAFCHAR: async (req, res) => {
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
          'select sc.id as "chargeCodeId" , sc."chargesCode", sc."chargesName", sc."chargesStatus",sc."createdBy",\
          su."uomName" ,sc."modifiedBy",sc."chargeTypeId",sc."chargesMCurId" as "currencyId", sc."uomId",sc2."currencyROE",\
          concat(sc."chargesName", \' - \',sc."chargesCode" ) as "chargeCodeName" from sc_charges sc\
          left join sc_charge_types sct on sct.id = sc."chargeTypeId"\
          left join sc_currencies sc2 on sc2.id = sc."chargesMCurId"\
          left join sc_uoms su on su.id = sc."uomId" \
           where sc."chargeTypeId" = 2 and sc."chargesCode"=\'AFCHAR \';'
        )
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
   * @method getAll
   * @description this method will fetch all Charges data
   * @param req
   * @param res
   * @returns void
   */
  getCommonCharges: async (req, res) => {
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
          'select sc.id , sc."chargesCode", sc."chargesName", sc."chargesStatus",sc."createdBy",\
          sc."modifiedBy",sc."chargeTypeId", sct."chargeTypeName",\
          concat(sc."chargesName", \' - \',sc."chargesCode" ) as "chargeCodeName" from sc_charges sc\
          left join sc_charge_types sct on sct.id = sc."chargeTypeId" where sc."chargeTypeId" = 1;'
        )
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
   * @method findAndCountAll
   * @description this method will fetch and show all Charges data
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
          'select sc.id, sc."chargesCode", sc."chargesMCurId", sc."chargesName",\
          sct."chargeTypeName" , sct2."carrierTypeName" ,\
          su."uomName", sc2."containerName",\
          sc."chargeTypeId", sc."carrierTypeId", sc."uomId",\
          sc."containerTypeId", sc."chargesStatus" as status\
          from sc_charges sc left join sc_charge_types sct on sct.id = sc."chargeTypeId"\
          left join sc_carrier_types sct2 on sct2.id  = sc."carrierTypeId" \
          left join sc_uoms su on su.id = sc."uomId" \
          left join sc_containers sc2 on sc2.id = sc."containerTypeId" where ';
        if (search.chargesCode !== null && search.chargesCode !== "") {
          query +=
            ' LOWER(sc."chargesCode") like \'%' +
            search.chargesCode.toLowerCase() +
            "%' and ";
        }
        if (search.chargesName !== null && search.chargesName !== "") {
          query +=
            ' LOWER(sc."chargesName") like \'%' +
            search.chargesName.toLowerCase() +
            "%' and ";
        }
        if (search.chargeTypeName !== null && search.chargeTypeName !== "") {
          query +=
            ' LOWER(sct."chargeTypeName") like \'%' +
            search.chargeTypeName.toLowerCase() +
            "%' and ";
        }
        if (search.uomName !== null && search.uomName !== "") {
          query +=
            ' LOWER(su."uomName") like \'%' +
            search.uomName.toLowerCase() +
            "%' and ";
        }

        query +=
          " true LIMIT " +
          req.query.limit +
          " OFFSET " +
          req.query.limit * req.query.currentPage;

        db.query(query)
          .then((data) => {
            db.query("select count(sc.id) from sc_charges sc").then((count) => {
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

  /**
   * @method create
   * @description this method will show form to create new Charges
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
        const ChargesPayload = {
          chargesCode: req.body.chargesCode,
          chargesName: req.body.chargesName,
          chargeTypeId: req.body.chargeTypeId,
          carrierTypeId: req.body.carrierTypeId,
          chargesMCurId: req.body.chargesMCurId,
          uomId: req.body.uomId,
          containerTypeId: req.body.containerTypeId,
          chargesStatus:req.body.chargesStatus,
          createdById: req.body.createdById,
          modifiedById: req.body.modifiedById,
        };
        await Charges.create(ChargesPayload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Charges.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will fetch Charges data based on id
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
        Charges.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Charges with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Charges with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Charges data based on id
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
        Charges.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Charges was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Charges with id=${id}. Maybe Charges was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Charges with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Charges data based on id
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
        Charges.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Charges was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete Charges with id=${id}. Maybe Charges was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Charges with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getAll
   * @description this method will fetch all Assigned Branches Data
   * @param req
   * @param res
   * @returns void
   */
  loadChargeTypes: async (req, res) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        let query =
          'select * from sc_charge_types sct ';
        db.query(query)
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Charges types.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getAll
   * @description this method will fetch all Assigned Branches Data
   * @param req
   * @param res
   * @returns void
   */
  loadCarrierTypes: async (req, res) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        let query =
          'select * from sc_carrier_types sct ';
        db.query(query)
          .then((data) => {
            res.send(data[0]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving carrier types.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
