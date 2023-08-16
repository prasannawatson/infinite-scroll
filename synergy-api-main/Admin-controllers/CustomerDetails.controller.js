const db = require("../db");
var _ = require("lodash");
const Customer = require("../Admin-Models/CustomerDetails.model");
const authController = require("../Admin-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all CustomerDetails data
   * @param req
   * @param res
   * @returns void
   */
  getAll: async (req, res) => {
    try {
      db.query(
        'select \
            sc."id" as "id",\
            sc."customerName" as "customerCompanyName", \
            sc."customerCode" as "customerCode", \
            scd."customerCompanyAddress" as "customerCompanyAddress",\
            scd."customerState" as "customerState",\
            scd."customerCity" as "customerCity",\
            sc_countries."countryName" as "customerCountry",\
            sc."customerStatus" as "customerStatus",\
            scd."shipmentParty" as "shipmentParty",\
            scd."vendorParty" as "vendorParty",\
            (select count(id) from sc_customer_details scd where scd."customerIdFk" = sc.id) as "branchCount"\
            from sc_customer_details scd left join sc_customers sc on sc."id" = scd."customerIdFk" \
            join sc_countries on sc_countries."id" = sc."customerCountryIdFk" '
      )
        .then((data) => {
          res.send(data[0]);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Customer.",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method findAndCountAll
   * @description this method will Find and Show  all CustomerDetails data
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
        const companyId = req.query.companyId;
        let query =
          'select \
                  sc."id" as "id",\
                  sc."customerName" as "customerCompanyName", \
                  sc."customerCode" as "customerCode", \
                  scd.id as "detailsId",\
                  scd."customerCompanyAddress" as "customerCompanyAddress",\
                  scd."customerState" as "customerState",\
                  scd."customerCity" as "customerCity",\
                  sc_countries."countryName" as "customerCountry",\
                  scd."customerStatus" as "customerStatus",\
                  scd."customerZip" as "customerZip",\
                  scd."customerEmail" as "customerEmail",\
                  scd."customerPhone" as "customerPhone",\
                  scd."customerFax" as "customerFax",\
                  scd."customerNetwork" ,\
                  scd."shipmentParty" as "shipmentParty",\
                  scd."vendorParty" as "vendorParty",\
                  (select count(id) from sc_customer_details scd where scd."customerIdFk" = sc.id) as "branchCount"\
                  from sc_customer_details scd left join sc_customers sc on sc."id" = scd."customerIdFk" \
                  join sc_countries on sc_countries."id" = sc."customerCountryIdFk" WHERE scd."custGlobalCompanyId" = '+companyId+' and';

        if ( search.customerCompanyName !== null && search.customerCompanyName !== "" ) {
          query += ' LOWER(sc."customerName") like \'%' + search.customerCompanyName.toLowerCase() + "%' and ";
        }
        if ( search.customerCompanyAddress !== null && search.customerCompanyAddress !== "" ) {
          query += ' LOWER(scd."customerCompanyAddress") like \'%' + search.customerCompanyAddress.toLowerCase() + "%' and ";
        }
        if (search.customerCountry !== null && search.customerCountry !== "") {
          query += ' LOWER(sc_countries."countryName") like \'%' + search.customerCountry.toLowerCase() + "%' and ";
        }
        if (search.customerState !== null && search.customerState !== "") {
          query += ' LOWER(scd."customerState") like \'%' + search.customerState.toLowerCase() + "%' and ";
        }
        if (search.customerCity !== null && search.customerCity !== "") {
          query +=
            ' LOWER(scd."customerCity") like \'%' +
            search.customerCity.toLowerCase() +
            "%' and ";
        }

        query +=
          " true LIMIT " +
          req.query.limit +
          " OFFSET " +
          req.query.limit * req.query.currentPage;

        db.query(query)
          .then((data) => {
            db.query( 'select count(sc_customer_details.id) from sc_customer_details \
            WHERE sc_customer_details."custGlobalCompanyId" = '+companyId).then((count) => {
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
   * @method getMasterCompany
   * @description this method will fetch MasterCompany data
   * @param req
   * @param res
   * @returns void
   */
  getMasterCompany: async (req, res) => {
    try {
      db.query(
        'select mc.m_cpy_id , mc.m_cpy_name, u."firstName" , mc.created_at  from master_company mc \
            join users u on u.id = mc.created_by '
      )
        .then((data) => {
          res.send(data[0][0]);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Customer.",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new CustomerDetails
   * @param req
   * @param res
   * @returns void
   */
  create: async (req, res) => {
    try {
      const payload = {
        customerBranchId: req.body.customerBranchId,
        customerIdFk: req.body.customerCompanyIdFk,
        customerCompanyAddress: req.body.customerCompanyAddress,
        customerCity: req.body.customerCity,
        customerState: req.body.customerState,
        customerZip: req.body.customerZip,
        customerEmail: req.body.customerEmail,
        customerPhone: req.body.customerPhone,
        customerFax: req.body.customerFax,
        customerNetwork: req.body.customerNetwork,
        customerLogId: req.body.customerLogId,
        customerRegDate: req.body.customerRegDate,
        shipmentParty: req.body.shipmentParty,
        vendorParty: req.body.vendorParty,
        customerType: req.body.customerType,
        customerStatus: req.body.customerStatus,
        custGlobalCompanyId: req.body.custGlobalCompanyId,
        custCompanyCountryId: req.body.custCompanyCountryId,
        custCompanyBranchId: req.body.custCompanyBranchId,
        customerBankStatus: req.body.customerBankStatus,
        createdBy: req.body.createdBy,
        modifiedBy: req.body.modifiedBy,
      };
      await Customer.create(payload)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Customer.",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show CustomerDetails data based on id
   * @param req
   * @param res
   * @returns void
   */
  find: async (req, res, next) => {
    try {
      const id = req.params.id;
      db.query(
        'select \
            sc."id" as "id",scd.id as "customerDetailsId",sc."customerCountryIdFk" ,\
            scd."id" as "customerDetailsId",\
            scd."customerBankStatus" ,\
            scd."customerIdFk" as "customerIdFk",\
            sc."customerName" as "customerName", \
            scd."customerCompanyAddress" as "customerCompanyAddress",\
            scd."customerState" as "customerState",\
            scd."customerCity" as "customerCity",\
            sc_countries."countryName" as "customerCountry",\
            sc."customerStatus" as "customerStatus",\
            scd."shipmentParty" as "shipmentParty",\
            scd."vendorParty" as "vendorParty",\
            scd."customerZip" as "customerZip",\
            scd."customerEmail" as "customerEmail",\
            scd."customerPhone" as "customerPhone",\
            scd."customerNetwork" as "customerNetwork",\
            scd."customerStatus" as "customerStatus",\
            scd."customerFax" as "customerFax"\
            from sc_customer_details scd left join sc_customers sc on sc."id" = scd."customerIdFk" \
            join sc_countries on sc_countries."id" = sc."customerCountryIdFk" where scd."customerIdFk" = ' +
          id
      )
        .then((data) => {
          if (data) {
            res.send(data[0]);
          } else {
            res.status(404).send({
              message: `Cannot find Customer with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error retrieving Customer with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show CustomerDetails data based on id
   * @param req
   * @param res
   * @returns void
   */
  findNameAddressEdit: async (req, res, next) => {
    try {
      const id = req.params.id;
      db.query(
        'select \
            sc."id" as "id",scd.id as "customerDetailsId",sc."customerCountryIdFk" ,\
            scd."id" as "customerDetailsId",\
            scd."customerIdFk" as "customerIdFk",\
            sc."customerName" as "customerName", \
            scd."customerCompanyAddress" as "customerCompanyAddress",\
            scd."customerState" as "customerState",\
            scd."customerCity" as "customerCity",\
            sc_countries."countryName" as "customerCountry",\
            sc."customerStatus" as "customerStatus",\
            scd."shipmentParty" as "shipmentParty",\
            scd."vendorParty" as "vendorParty",\
            scd."customerZip" as "customerZip",\
            scd."customerEmail" as "customerEmail",\
            scd."customerPhone" as "customerPhone",\
            scd."customerNetwork" as "customerNetwork",\
            scd."customerStatus" as "customerStatus",\
            scd."customerFax" as "customerFax"\
            from sc_customer_details scd left join sc_customers sc on sc."id" = scd."customerIdFk" \
            join sc_countries on sc_countries."id" = sc."customerCountryIdFk" where scd."id" = ' +
          id
      )
        .then((data) => {
          if (data) {
            res.send(data[0]);
          } else {
            res.status(404).send({
              message: `Cannot find Customer with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          
          res.status(500).send({
            message: "Error retrieving Customer with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },


  /**
   * @method find
   * @description this method will Find and Show CustomerDetails data based on id
   * @param req
   * @param res
   * @returns void
   */
  viewCustomerDetails: async (req, res, next) => {
    try {
      const id = req.params.id;
      db.query(
        'SELECT\
        sc."id" AS "id",\
        COALESCE(scd.id) AS "customerDetailsId",\
        COALESCE(scd."id") AS "customerDetailsId",\
        COALESCE(scd."customerIdFk") AS "customerIdFk",\
        COALESCE(sc."customerName", \'-\') AS "customerName",\
        COALESCE(scd."customerCompanyAddress",\'-\') AS "customerCompanyAddress",\
        COALESCE(scd."customerCity",\'-\') AS "customerCity",\
        COALESCE(sc_countries."countryName",\'-\') AS "customerCountry",\
        COALESCE(scd."customerState",\'-\') AS "customerState",\
        COALESCE(scd."customerZip") AS "customerZip",\
        COALESCE(scd."customerEmail",\'-\') AS "customerEmail",\
        COALESCE(scd."customerPhone") AS "customerPhone",\
        COALESCE(scd."customerFax",\'-\') AS "customerFax",\
        COALESCE(scd."customerNetwork",\'-\') AS "customerNetwork",\
        COALESCE(sbi."bankCode",\'-\') AS "bankCode",\
        COALESCE(sbi."bankBranch",\'-\') AS "bankBranch",\
        COALESCE(sbi."bankName",\'-\') AS "bankName",\
        COALESCE(sbi."bankAddress",\'-\') AS "bankAddress",\
        COALESCE(sbi."bankAccNameCheque",\'-\') AS "bankAccNameCheque",\
        COALESCE(sbi."bankAccNameFull",\'-\') AS "bankAccNameFull",\
        COALESCE(sbi."bankAccNumber") AS "bankAccNumber",\
        COALESCE(sbi."bankAccType",\'-\') AS "bankAccType",\
        COALESCE(sbi."bankCurrency",\'-\') AS "bankCurrency",\
        COALESCE(sbi."bankSwiftCode",\'-\') AS "bankSwiftCode",\
        COALESCE(sbi."bankIfscCode",\'-\') AS "bankIfscCode",\
        COALESCE(sbi."bankIbanCode",\'-\') AS "bankIbanCode",\
        COALESCE(sbi."bankControlDigitCode",\'-\') AS "bankControlDigitCode"\
        FROM sc_customer_details scd\
        LEFT JOIN sc_customers sc ON sc."id" = scd."customerIdFk"\
        JOIN sc_countries ON sc_countries."id" = sc."customerCountryIdFk"\
        LEFT JOIN sc_bank_infos sbi ON sbi."bankCustomerDetailsIdFk" = scd.id WHERE scd."customerIdFk" = ' +id
      )
        .then((data) => {
          if (data) {
            res.send(data[0]);
          } else {
            res.status(404).send({
              message: `Cannot find Customer with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          console.log(err)
          res.status(500).send({
            message: "Error retrieving Customer with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update CustomerDetails data based on id
   * @param req
   * @param res
   * @returns void
   */
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      Customer.update(req.body, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Customer was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          console.log(err)
          res.status(500).send({
            message: "Error updating Customer with id=" + id,
          });
        });
    } 
    catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete CustomerDetails data based on id
   * @param req
   * @param res
   * @returns void
   */
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      Customer.destroy({
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Customer was deleted successfully!",
            });
          } else {
            res.send({
              message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Could not delete Customer with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },
};
