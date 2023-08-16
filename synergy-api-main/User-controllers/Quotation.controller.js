const db = require("../db");
var _ = require("lodash");
const roles = require("../roles");
const Quotation = require("../User-Models/Quotation.model");
const authController = require("../User-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Quotation data
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
        Quotation.findAll()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving Quotation Info.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method getAll
   * @description this method will fetch all Quotation data for Preview
   * @param req
   * @param res
   * @returns void
   */
  getAllForView: async (req, res) => {
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
        console.log(search)
        let query = 'select sq.id,\
        (select sc."customerName") as "customerName",\
        sq."customerNameIdFk" ,sq."routedBy" ,sq.freights ,sq."validFrom" ,sq."validTill" ,\
        sq."freightStatus" as status, sq."qoutationNumber" as "qoutationNumber", sq."createdDate"  \
        from sc_quotations sq left join sc_customers sc on sc.id = sq."customerNameIdFk" where sq."branchNameId"='+req.query.branchId+'and\
        sq.freights = \'AIR EXPORTS\' \ or sq.freights = \'AIR IMPORTS\' or sq.freights = \'CROSS COUNTRY AIR\' and';
        if (search.customerName !== null && search.customerName !== "") {
          query += ' LOWER(sc."customerName") like \'%' + search.customerName.toLowerCase() + "%' and ";
        }
        if (search.qoutationNumber !== null && search.qoutationNumber !== "") {
          query += ' LOWER(sq."qoutationNumber") like \'%' + search.qoutationNumber.toLowerCase() + "%' and ";
        }
        if (search.routedBy !== null && search.routedBy !== "") {
          query += ' LOWER(sq.\"routedBy\") like \'%' + search.routedBy.toLowerCase() + "%' and ";
        }
        if (search.createdDate !== null && search.createdDate !== "") {
          query += ' CAST(sq."createdDate" AS VARCHAR) like \'%' + search.createdDate + "%' and ";
        }
        if (search.validTill !== null && search.validTill !== "") {
          query += ' CAST(sq."validTill" AS VARCHAR) like \'%' + search.validTill + "%' and ";
        }
        if (search.freights !== null && search.freights !== "") {
          query += ' LOWER(sq."freights") like \'%' + search.freights.toLowerCase() + "%' and ";
        }
        query +=" true LIMIT " +req.query.limit +" OFFSET " +req.query.limit * req.query.currentPage;

        db.query(query)
          .then((data) => {
            db.query('select count(sq.id) from sc_quotations sq where \
            sq.freights = \'AIR EXPORTS\' \ or sq.freights = \'AIR IMPORTS\' or sq.freights = \'CROSS COUNTRY AIR\' and \
            sq.id='+req.query.branchId).then(
              (count) => {
                const response = {
                  count: count[0][0].count,
                  data: data[0],
                  currentPage: req.query.currentPage,
                  limit: req.query.limit,
                };
                res.send(response);
              }
            );
          })
          .catch((err) => {
            console.log(err)
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving Quotation Info.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new Quotation Info
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
        const QuotationPayload = {
          customerNameIdFk:req.body.customerNameIdFk,
          routedBy:req.body.routedBy,
          salesPersonIdFk:req.body.salesPersonIdFk,
          approvedEmployeeIdFk:req.body.approvedEmployeeIdFk,
          validFrom:req.body.validFrom,
          validTill:req.body.validTill,
          followUpDate:req.body.followUpDate,
          freights:req.body.freights,
          placeOfLoadingId:req.body.placeOfLoadingId,
          portOfLoadingId:req.body.portOfLoadingId,
          qoutationNumber:req.body.qoutationNumber,
          portOfDischargeId:req.body.portOfDischargeId,
          placeOfDeliveryId:req.body.placeOfDeliveryId,
          categoryId:req.body.categoryId,
          termsId:req.body.termsId,
          PPCC:req.body.PPCC,
          modifiedBy:req.body.modifiedBy,
          createdBy:req.body.createdBy,
          freightStatus:req.body.status,
          createdDate:req.body.createdDate,
          globalCompanyId:req.body.companyId,
          branchCountryId:req.body.companyCountryId,
          branchNameId:req.body.companyNameId,
        };
        await Quotation.create(QuotationPayload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            console.log(err)
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
   * @description this method will Find and Show Quotation Info data based on id
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
        Quotation.findOne({
          where: { id: id },
        })
          .then((data) => {
            if (data) {
              db.query('select count(sqc.id) as "carrierCount" from sc_quote_carriers sqc where sqc."quoteId"='+id)
              .then((carrierData)=>{
                const datums = {
                  carrierData : carrierData[0],
                  data : data
                }
              res.send(datums);
            })
            } else {
              res.status(404).send({
                message: `Cannot find Quotation Info with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Quotation Info with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Quotation Info data based on id
   * @param req
   * @param res
   * @returns void
   */
  update: async (req, res, next) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.createFclQuotation).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        Quotation.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Quotation Info was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Quotation Info with id=${id}. Maybe Quotation Info was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Quotation Info with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Quotation Info data based on id
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
        Quotation.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Quotation Info was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete Quotation Info with id=${id}. Maybe Quotation Info was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Quotation Info with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Quotation Info data based on id
   * @param req
   * @param res
   * @returns void
   */
  getStatus: async (req, res, next) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.createFclQuotation).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        db.query('select * from sc_quote_status sqs')
          .then((data) => {
            if (data) {
              res.send(data[0]);
            } else {
              res.send("Data not found");
            }
          })
          .catch((err) => {
            console.log(err)
            res.status(500).send({
              message: "Error updating Quotation Info with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  

  /**
   * @method update
   * @description this method will update Quotation Info data based on id
   * @param req
   * @param res
   * @returns void
   */
  updateStatus: async (req, res, next) => {
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.createFclQuotation).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const id = req.params.id;
        Quotation.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Quotation Info was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Quotation Info with id=${id}. Maybe Quotation Info was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            console.log(err)
            res.status(500).send({
              message: "Error updating Quotation Info with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
    // try {
    //   const auth = await authController.authorizeTokenWithAbility(req,roles.createFclQuotation).then((result) => {
    //     return result;
    //   });
    //   if (!auth) {
    //     res.status(401).send({
    //       message: "Unauthorized.",
    //     });
    //   } else {
    //     const id = req.params.id;
    //     const status = req.query.status;
    //     let query = 'update sc_quotations sq set "freightStatus" = '+'\''+status+'\''+' where sq.id = '+id
    //     db.query(query)
    //       .then((num) => {
    //         if (num == 1) {
    //           res.send({
    //             message: "Quotation Info was updated successfully.",
    //           });
    //         } else {
    //           res.send({
    //             message: `Cannot update Quotation Info with id=${id}. Maybe Quotation Info was not found or req.body is empty!`,
    //           });
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //         res.status(500).send({
    //           message: "Error updating Quotation Info with id=" + id,
    //         });
    //       });
    //   }
    // } catch (error) {
    //   console.log(error.message);
    // }
  },
};
