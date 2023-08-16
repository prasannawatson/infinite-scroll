const { Router } = require("express");
const db = require("../db");
const path = require("path");
var _ = require("lodash");
const multer = require("multer");
const router = Router();
const fs = require('fs')
const roles = require("../roles");
const authController = require("../Admin-controllers/auth");
const quoteDocument = require("../Admin-Models/QuoteDocument.model");

const imageStorage = multer.diskStorage({
  destination: "./Public/upload/",
  filename: (req, file, cb) => {
    const originalExtension = path.extname(file.originalname);
    var date = new Date();
    cb(null, "SC-" + date.toISOString().slice(0, 10) + "-" + req.body.documentName + originalExtension);
  },
});

const filesDel = multer.diskStorage({
  destination: "./Public/upload/",
  filename: (req, file, cb) => {
    let files = fs.readdirSync("./Public/upload");
    if (files.includes(req.body.documentName))
      fs.unlinkSync("./Public/upload/" + req.body.documentName)
  }
})

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 2000000, // 1000000 Bytes = 1 MB
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
  imageUpload.single("uploadFileName"),
  async (req, res) => {
    /**
     * @method create
     * @description this method will create new IncoTerm
     * @param req
     * @param res
     * @returns void
     */
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const originalExtension = path.extname(req.file.originalname);
        var date = new Date();
        const payload = {
          documentName:
            "SC-" +
            date.toISOString().slice(0, 10) +
            "-" +
            req.body.documentName+originalExtension,
          uploadFileName: req.file.originalname,
          documentCategory: req.body.documentCategory,
          createdAt: date.toString(),
          quoteId: Number(req.body.quoteId),
          status: req.body.status,
          createdBy: Number(req.body.createdBy),
          modifiedBy: Number(req.body.modifiedBy),
        };
        await quoteDocument.create(payload)
          .then((data) => {
            res.send(JSON.parse(JSON.stringify(data)));
          })
          .catch((err) => {
            console.log(err)
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

router.get("/getDoc/:id", async (req, res) => {
  const id = req.body.quoteId;
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
      quoteDocument.findAll({
        where: { quoteId: id },
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

router.delete("/deleteDoc/:id", async (req, res) => {
  try {
    const auth = await authController.authorizeToken(req).then((result) => {
      return result;
    });
    if (!auth) {
      res.status(401).send({
        message: "Unauthorized.",
      });
    } else {
      fs.access("./Public/upload/" + req.query.documentName, fs.constants.F_OK, (err) => {
        if (err) {
          res.status(404).send('File not found.');
        } else {
          fs.unlink("./Public/upload/" + req.query.documentName, (err) => {
            if (err) {
              res.status(500).send('Failed to delete file.');
            } else {
              const id = req.params.id;
              quoteDocument.destroy({
                where: { id: id },
              })
                .then((num) => {
                  if (num == 1) {
                    res.send({
                      message: "Document was deleted successfully!",
                    });
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
          });
        }
      })
    }
  } catch (error) {
    console.log(error.message);
  }
});


router.get('/download/:filename', (req, res) => {
  const fileDir = __dirname
  const poFile = fileDir.split(path.sep)
  const indexToRemove = poFile.indexOf('Admin-controllers')
  poFile.splice(indexToRemove,1)
  const updatedURL = poFile.join(path.sep)
  const filename = '/Public/upload/'+req.params.filename;
  const file = path.join(updatedURL, filename);
  res.sendFile(file, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Error downloading the file.');
    }
  });
});

module.exports = router;