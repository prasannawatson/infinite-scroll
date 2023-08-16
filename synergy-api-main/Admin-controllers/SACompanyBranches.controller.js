const db = require("../db");
var _ = require("lodash");
const companyBranches = require("../Admin-Models/SACompanyBranches.model");
const authController = require("../Admin-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Company Branches data
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
        companyBranches.findAll()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving companyBranches.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method findAndCountAll
   * @description this method will Find and Show all Company Branches data
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
        const id = req.query.userId;
        const search = JSON.parse(req.query.search);
        let query =
          'select scb.id,scb."saBranchName", scb."saBranchCountryId", scb."saBranchStateId",scb."saBranchCityId", scb."saBranchZip",\
          scb."saBranchPrimEmail", scb."saBranchAltEmail",scb."saBranchPrimNum",scb."saBranchAltNum",\
          scb."saBranchSecCurrency",scb."saBranchAddress", scb."saBranchSecCurrency",scb.status, scb."saCompanyCountryId",\
          (select sc."currencyCode") as "secondaryCurrency",scb."saBranchFirstName",scb."saBranchLastName",scb."createdSAId",\
          concat(scb."saBranchFirstName",\' \',scb."saBranchLastName") as "branchInchargeName",\
          (select ss."stateName") as "stateName",\
          (select sc2."cityName") as "cityName",\
          (select sc3."countryName") as "countryName",\
          concat(scb."saBranchAddress",\', \',sc2."cityName" ,\',\',sc3."countryName",\', \',ss."stateName",\'-\',scb."saBranchZip") as "Address",\
          (select sl."paSaCompanyId") as "companyId",\
          (select scc."saCompanyName") as "CompanyCountryName"\
          from sa_company_branches scb left join sa_country_companies scc on scc.id = scb."saCompanyCountryId" \
          left join sc_currencies sc on sc.id = scb."saBranchSecCurrency" left join sc_states ss on\
          ss.id = scb."saBranchStateId" left join sc_cities sc2 on sc2.id = scb."saBranchCityId" left join \
          sc_countries sc3 on sc3.id = scb."saBranchCountryId" join sa_logins sl on sl.id = scb."createdSAId" \
          join pa_global_companies pgc on pgc.id = sl."paSaCompanyId"\
          where pgc.id = sl."paSaCompanyId" and scb."createdSAId" = sl.id and scb."paSaGlobalCompanyId" = '+id+' and';
        if (search.CompanyCountryName !== null && search.CompanyCountryName !== "") {
          query += ' LOWER(scc."saCompanyName") like \'%' + search.CompanyCountryName.toLowerCase() +"%' and ";
        }
        if ( search.saBranchPrimNum !== null && search.saBranchPrimNum !== "") {
            query += ' CAST(scb."saBranchPrimNum" AS VARCHAR) like \'%' +search.saBranchPrimNum.toLowerCase() + "%' and ";
        }
        if ( search.saBranchPrimEmail !== null && search.saBranchPrimEmail !== "" ) {
          query += ' LOWER(scb."saBranchPrimEmail") like \'%' + search.saBranchPrimEmail.toLowerCase() + "%' and ";
        }
        if (search.Address !== null && search.Address !== "") {
          query += ' LOWER(scb."saBranchAddress") like \'%' + search.Address.toLowerCase() + "%' or ";
          query += ' LOWER(sc3."countryName") like \'%' + search.Address.toLowerCase() + "%' or ";
          query += ' LOWER(ss."stateName") like \'%' + search.Address.toLowerCase() + "%' or ";
          query += ' LOWER(sc2."cityName") like \'%' + search.Address.toLowerCase() + "%' or ";
          query += ' LOWER(scb."saBranchZip") like \'%' + search.Address.toLowerCase() + "%' and ";
        }
        query += " true LIMIT " + req.query.limit + " OFFSET " + req.query.limit * req.query.currentPage;
        db.query(query)
          .then((data) => {
            db.query(
              'select count(sa_company_branches.id) from sa_company_branches where sa_company_branches."paSaGlobalCompanyId"= '+id
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
            console.log(err.message);
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


  viewSABranches: async (req, res) => {
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
          'select scb.id,scb."saBranchName", scb."saBranchCountryId", scb."saBranchStateId",scb."saBranchCityId", scb."saBranchZip",\
          scb."saBranchPrimEmail", scb."saBranchAltEmail",scb."saBranchPrimNum",scb."saBranchAltNum",\
          scb."saBranchSecCurrency",scb."saBranchAddress", scb."saBranchSecCurrency",scb.status, scb."saCompanyCountryId",\
          scb."saBranchFirstName",scb."saBranchLastName",scb."createdSAId",\
          (select sc."currencyCode") as "secondaryCurrency",\
          (select ss."stateName") as "stateName",(select sc2."cityName") as "cityName",\
          (select sc3."countryName") as "countryName",(select sl."paSaCompanyId") as "companyId",\
          (select scc."saCompanyName") as "CompanyCountryName"\
          from sa_company_branches scb \
          left join sa_country_companies scc on scc.id = scb."saCompanyCountryId" \
          left join sc_currencies sc on sc.id = scb."saBranchSecCurrency"\
          left join sc_states ss on ss.id = scb."saBranchStateId" \
          left join sc_cities sc2 on sc2.id = scb."saBranchCityId" \
          left join sc_countries sc3 on sc3.id = scb."saBranchCountryId" join sa_logins sl on sl.id = scb."createdSAId" \
          join pa_global_companies pgc on pgc.id = sl."paSaCompanyId"\
          where pgc.id = sl."paSaCompanyId" and scb."createdSAId" = sl.id and scb."paSaGlobalCompanyId"='+ req.query.companyId + 'and scb.id='+req.query.id;
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
   * @description this method will create new Company Branches
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
        
        // console.log(defaultBranch)
        const payload = {
            id: req.body.id,
            saBranchName: req.body.saBranchName,
            saBranchAddress: req.body.saBranchAddress,
            saBranchCountryId: req.body.saBranchCountryId,
            saBranchStateId: req.body.saBranchStateId,
            saBranchCityId: req.body.saBranchCityId,
            saBranchZip: req.body.saBranchZip,
            saBranchFirstName: req.body.saBranchFirstName,
            saBranchLastName: req.body.saBranchLastName,
            saBranchPrimEmail: req.body.saBranchPrimEmail,
            saBranchAltEmail: req.body.saBranchAltEmail,
            saBranchPrimNum: req.body.saBranchPrimNum,
            saBranchAltNum: req.body.saBranchAltNum,
            saBranchSecCurrency: req.body.saBranchSecCurrency,
            paSaGlobalCompanyId: req.body.paSaGlobalCompanyId,
            saCompanyCountryId:req.body.saCompanyCountryId,
            status: req.body.status,
            createdSAId: req.body.createdSAId,
            modifiedSAId: req.body.modifiedSAId,
        };
        await companyBranches.create(payload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the companyBranches.",
            });
          });
      }
    } 
    catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Company Branches data based on id
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
        companyBranches.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Company Branches with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Company Branches with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Company Branches data based on id
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
        companyBranches.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Company Branches was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Company Branches with id=${id}. Maybe Company Branches was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Company Branches with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Company Branches data based on id
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
        companyBranches.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Company Branches was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete Company Branches with id=${id}. Maybe Company Branches was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Company Branches with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
