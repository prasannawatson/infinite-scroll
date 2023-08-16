const db = require("../db");
var _ = require("lodash");
const Customers = require("../Admin-Models/Customers.model");
const authController = require("../Admin-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all customers data
   * @param req
   * @param res
   * @returns void
   */
  getAll: async (req, res) => {
    try {
      db.query(
        'select scust."id" as "fclExportCustomerIdFk", \
        scust."id" as "id", \
        (select scust."customerName" as "customerName"),\
        (select "countryName" from sc_countries scnt where scnt.id = scust."customerCountryIdFk" )as "customerCountry"\
        from sc_customers scust'
      )
        .then((data) => {
          res.send(data[0]);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Customers.",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new Customers
   * @param req
   * @param res
   * @returns void
   */
  create: async (req, res) => {
    try {
      const payload = {
        customerBranchId: req.body.customerBranchId,
        customerName: req.body.customerCompanyName,
        customerCode: req.body.customerCode,
        customerCountryIdFk: req.body.customerCountry,
        customerStatus: req.body.customerStatus,
        createdBy: req.body.createdBy,
        modifiedBy: req.body.modifiedBy,
      };
      await Customers.create(payload)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          console.log(err)
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the Customers.",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Customers data based on id
   * @param req
   * @param res
   * @returns void
   */
  find: async (req, res, next) => {
    try {
      const id = req.params.id;
      Customers.findByPk(id)
        .then((data) => {
          if (data) {
            res.send(data);
          } else {
            res.status(404).send({
              message: `Cannot find Customers with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error retrieving Customers with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Customers data based on id
   * @param req
   * @param res
   * @returns void
   */
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      Customers.update(req.body, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Customers was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update Customers with id=${id}. Maybe Customers was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Customers with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Customers data based on id
   * @param req
   * @param res
   * @returns void
   */
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      Customers.destroy({
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Customers was deleted successfully!",
            });
          } else {
            res.send({
              message: `Cannot delete Customers with id=${id}. Maybe Customers was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Could not delete Customers with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method loadCountries
   * @description this method will load all Countries
   * @param req
   * @param res
   * @returns void
   */
  loadCountries: async (req, res) => {
    try {
      db.query(" select * from sc_countries")
        .then((data) => {
          res.send(data[0]);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Countries.",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },
};
