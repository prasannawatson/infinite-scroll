const db = require("../db");
var _ = require("lodash");
const Document = require("../User-Models/Document.model");
const authController = require("../User-controllers/auth");
const fileUpload = require("express-fileupload");
const express = require("express");
const app = express();
const fs = require("fs");
var http = require("http");
var bodyParser = require("body-parser");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Document data
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
        Document.findAll()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Document.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new Document
   * @param req
   * @param res
   * @returns void
   */
  create: async (req, res, next) => {
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
          documentCategory: req.body.documentCategory,
          documentUploadName: req.body.documentUploadName,
          fclBookingIdFk: req.body.fclBookingIdFk,
          documentCreatedTime: req.body.documentCreatedTime,
          status: req.body.status,
          modifiedBy: req.body.modifiedBy,
          createdBy: req.body.createdBy,
        };
        const filedetails = new payload(req.body);
        if (req.files) {
          const dept = req.files;
          var file = dept.image;
          file.mv("Public/Data/Upload/" + file.name);
          filedetails.image = file.name;
        }
      }
    } catch (error) {
      console.log(error);
      console.log("Test");
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Document data based on id
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
        Document.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Document with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Document with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Document data based on id
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
        Document.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Document was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Document with id=${id}. Maybe Document was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Document with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Document data based on id
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
        Document.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Document was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete Document with id=${id}. Maybe Document was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Document with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
