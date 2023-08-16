const { Router } = require("express");
const db = require("../db");
const path = require("path");
var _ = require("lodash");
const multer = require("multer");
const router = Router();
const roles = require("../roles");
const authController = require("../User-controllers/auth");
const FclFiles = require("../User-Models/FclFiles.model");

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: "./Public/upload/",
  filename: (req, file, cb) => {
    var date = new Date();
    cb(null, "SC-" + date.toISOString().slice(0, 10) + "-" + file.originalname);
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});
const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|pdf|csv|xlsx|docx)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/",
  imageUpload.single("documentUploadName"),
  async (req, res) => {
    /**
     * @method create
     * @description this method will create new IncoTerm
     * @param req
     * @param res
     * @returns void
     */
    try {
      const auth = await authController.authorizeTokenWithAbility(req,roles.createFclBooking).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        var date = new Date();
        const payload = {
          documentUploadName:
            "SC-" +
            date.toISOString().slice(0, 10) +
            "-" +
            req.file.originalname,
          documentCategory: req.body.documentCategory,
          fclBookingIdFk: req.body.fclBookingIdFk,
          documentCreatedTime: date.toString(),
          status: req.body.status,
          createdBy: req.body.createdBy,
          modifiedBy: req.body.modifiedBy,
        };
        await FclFiles.create(payload)
          .then((data) => {
            res.send(JSON.parse(JSON.stringify(data)));
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the FclFiles.",
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/getFiles/:id", async (req, res) => {
  const id = req.body.fclBookingIdFk;
  try {
    const auth = await authController.authorizeTokenWithAbility(req,roles.viewFclBooking).then((result) => {
      return result;
    });
    if (!auth) {
      res.status(401).send({
        message: "Unauthorized.",
      });
    } else {
      const id = req.params.id;
      FclFiles.findAll({
        where: { fclBookingIdFk: id },
      })
        .then((data) => {
          if (data) {
            res.send(data);
          } else {
            res.status(404).send({
              message: `Cannot find Employee with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error retrieving Employee with id=" + id,
          });
        });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
