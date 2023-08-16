const db = require("../db");
var _ = require("lodash");
const ChargesMapping = require("../Admin-Models/ChargesMapping.model");
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
                "Some error occurred while retrieving ChargesMapping.",
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
                join sc_uoms su on su.id = scm."chargeUOMFk" WHERE';
        if (search.chargesName !== null && search.chargesName !== "") {
          query +=
            ' LOWER(sc."chargesName") like \'%' +
            search.chargesName.toLowerCase() +
            "%' and ";
        }
        if (search.chargeCategory !== null && search.chargeCategory !== "") {
          query +=
            " LOWER(CAST(coalesce(scm.\"chargeCategoryFk\", '0') AS integer) = 1 then 'Air'  when CAST(coalesce(scm.\"chargeCategoryFk\", '0') AS integer) = 2 then 'Ocean' else 'All' end) like '%" +
            search.chargeCategory.toLowerCase() +
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
            db.query(
              "select count(sc_charges_mappings.id) from sc_charges_mappings"
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
          chargeNameFk: req.body.chargeNameFk,
          chargeContainerIdFk:req.body.chargeContainerIdFk,
          chargeCategoryFk: req.body.chargeCategoryFk,
          chargeUOMFk: req.body.chargeUOMFk,
          status: req.body.status,
          createdBy: req.body.createdBy,
          modifiedBy: req.body.modifiedBy,
        };

        await ChargesMapping.create(payload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the ChargesMapping.",
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
        ChargesMapping.findByPk(id)
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
        ChargesMapping.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "ChargesMapping was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update ChargesMapping with id=${id}. Maybe ChargesMapping was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
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
        ChargesMapping.destroy({
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
