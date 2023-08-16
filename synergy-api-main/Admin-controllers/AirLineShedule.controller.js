const db = require("../db");
var _ = require("lodash");
const airLineSchedule = require("../Admin-Models/AirLineSchedule.model");
const authController = require('../Admin-controllers/auth');
const cargoType = require("../Admin-Models/CargoCategory.model")

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Air Line Schedule data
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
        airLineSchedule.findAll()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving airLineSchedule.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method findAndCountAll
   * @description this method will fetch all Air Line Schedule data
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
      }
      else {
        const search = JSON.parse(req.query.search)
        let query = 'select ssr.id, ssr."segmentId", ssr."airLineCarrierId", ssr."cargoTypeId",\
        ssr."rateType",ssr."validFrom",\
        ssr."minBuyRate", ssr."sellRate", ssr."validTill", ssr."fromKg", ssr."toKg", \
        ssr."buyRate", ssr."minSellRate", ssr."createdBy",ssr."polId", ssr."podId",ssr.status,\
        concat(\'(\',sa."airPortCode",\') \',sa."airPortName") as "POL",\
        concat(\'(\',sa2."airPortCode",\') \', sa2."airPortName") as "POD", \
        concat(u."firstName",\' \', u."lastName") as "creator" \
        from sc_slab_rates ssr left join users u on u."employeeId" = ssr."createdBy" left join sc_airports sa on\
        sa.id  = ssr."polId" left join sc_airports sa2 on sa2.id = ssr."podId" where ssr."segmentId" = '+req.query.segmentId+'\
        and ssr."cargoTypeId" = '+req.query.cargoId+' and ssr."airLineCarrierId" = '+req.query.airLineId+'\
         and ssr."rateType" = \''+req.query.rateType+'\' and ssr."globalCompanyId"='+req.query.companyId+ ' and'; 
        if (search.POL !== null && search.POL !== '') {
          query += " LOWER(sa.\"airPortCode\") like '%" + search.POL.toLowerCase() + "%' or "
          query += " LOWER(sa.\"airPortName\") like '%" + search.POL.toLowerCase() + "%' and "
        }
        if (search.fromKg !== null && search.fromKg !== '') {
          query += ' CAST(ssr.\"fromKg\" AS VARCHAR) like \'%' + search.fromKg.toLowerCase() + "%' and ";
        }
        // if (search.portOfLoading !== null && search.portOfLoading !== '') {
        //   query += " LOWER(sa.\"airPortCode\")like '%" + search.portOfLoading.toLowerCase() + "%' and "
        // }
        // if (search.portOfDischarge !== null && search.portOfDischarge !== '') {
        //   query += " LOWER(sa2.\"airPortCode\")like '%" + search.portOfDischarge.toLowerCase() + "%' and "
        // }
        // if (search.directTransitPort !== null && search.directTransitPort !== '') {
        //   query += " LOWER(sa3.\"airPortCode\")like '%" + search.directTransitPort.toLowerCase() + "%' and "
        // }
        // if (search.airLineName !== null && search.airLineName !== '') {
        //   query += " LOWER(sac.\"airLineName\")like '%" + search.airLineName.toLowerCase() + "%' and "
        // }
        query += " true LIMIT " + req.query.limit + " OFFSET " +req.query.limit * req.query.currentPage;
        db.query(query)
          .then((data) => {
            db.query(
              'select count(ssr.id) from sc_slab_rates ssr where ssr."segmentId" = '+req.query.segmentId+'\
              and ssr."cargoTypeId" = '+req.query.cargoId+' and ssr."airLineCarrierId" = '+req.query.airLineId+'\
               and ssr."rateType" = \''+req.query.rateType+'\' and ssr."globalCompanyId"='+req.query.companyId
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
                err.message ||
                "Some error occurred while retrieving Air Line Schedule.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new Air Line Schedule
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
        let payload = JSON.parse(JSON.stringify(req.body));
        payload.map((item) => {
          delete item.id
        })
        await airLineSchedule.bulkCreate(payload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            console.log(err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the airLineSchedule.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will fetch Air Line Schedule data based on id
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
        const polId = req.query.polId;
        const podId = req.query.podId;
        airLineSchedule.findAll({
          where:{polId: polId, podId:podId}
        })
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Air Line Schedule with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Air Line Schedule with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method cargoList
   * @description this method will fetch Air Line Schedule data based on id
   * @param req
   * @param res
   * @returns void
   */
  cargoList: async (req, res, next) => {
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
        cargoType.findAll()
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Cargo-type List with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Cargo-type list with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method cargoList
   * @description this method will fetch Air Line Schedule data based on id
   * @param req
   * @param res
   * @returns void
   */
  cargoListQuote: async (req, res, next) => {
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
        db.query('select * from sc_cargo_categories scc where id!=7')
          .then((data) => {
            if (data) {
              res.send(data[0]);
            } else {
              res.status(404).send({
                message: `Cannot find Cargo-type List with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Cargo-type list with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Air Line Schedule data based on id
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
        airLineSchedule.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Air Line Schedule was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Air Line Schedule with id=${id}. Maybe Air Line Schedule was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Air Line Schedule with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Air Line Schedule data based on id
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
        airLineSchedule.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Air Line Schedule Schedule was deleted successfully!",
              });
            } else {
              res.send({
                message: ` Cannot delete Air Line Schedule with id=${id}. Maybe Air Line Schedule was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Air Line Schedule with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
