const db = require("../db");
var _ = require("lodash");
const BankDetails = require("../Admin-Models/BankDetails.model");
const authController = require("../Admin-controllers/auth");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Bank data
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
        BankDetails.findAll()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving Bank Info.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new Bank Details to the customer
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
          bankCustomerIdFk: req.body.bankCustomerIdFk,
          bankCustomerDetailsIdFk: req.body.bankCustomerDetailsIdFk,
          bankCode: req.body.bankCode,
          bankName: req.body.bankName,
          bankBranch: req.body.bankBranch,
          bankAddress: req.body.bankAddress,
          bankAccNameCheque: req.body.bankAccNameCheque,
          bankAccNameFull: req.body.bankAccNameFull,
          bankAccNumber: req.body.bankAccNumber,
          bankAccType: req.body.bankAccType,
          bankCurrency: req.body.bankCurrency,
          bankSwiftCode: req.body.bankSwiftCode,
          bankIfscCode: req.body.bankIfscCode,
          bankIbanCode: req.body.bankIbanCode,
          bankControlDigitCode: req.body.bankControlDigitCode,
          bankStatus: req.body.customerBankStatus,
          createdBy: req.body.createdBy,
          modifiedBy: req.body.modifiedBy,
        };
        await BankDetails.create(payload)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Bank Info.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method findNameEdit
   * @description this method will fetch and Edit Bank data based on customer table id from Name Address Page
   * @param req
   * @param res
   * @returns void
   */
  findNameEdit: async (req, res, next) => {
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
        BankDetails.findAll({
          where: { bankCustomerIdFk: id },
        })
          .then((data) => {
            if (data) {
              res.send(data[0]);
            } else {
              res.status(404).send({
                message: `Cannot find Bank info with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Bank info with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method findBankEdit
   * @description this method will fetch and Edit Bank data based on customer details id from bank Info page
   * @param req
   * @param res
   * @returns void
   */
  findBankEdit: async (req, res, next) => {
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
        db.query(
          'select * ,\
        (select sc."customerName") as "customerName"\
        from sc_bank_infos sbi left join sc_customers sc on sc.id = sbi."bankCustomerDetailsIdFk" where sbi."bankCustomerDetailsIdFk" =' +
            id
        )
          .then((data) => {
            if (data) {
              res.send(data[0]);
            } else {
              res.status(404).send({
                message: `Cannot find Bank info with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Bank info with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Bank data based on id
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
        BankDetails.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Bank Info was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Bank Info with id=${id}. Maybe Bank Info was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Bank Info with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Bank Info data based on id
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
        BankDetails.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Bank Info was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete Bank Info with id=${id}. Maybe Bank Info was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Bank Info with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
