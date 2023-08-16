const { Router } = require("express");
var path = require("path");
const db = require("../db");
var _ = require("lodash");
const fs = require('fs')
const multer = require("multer");
const routerSACompany = Router();
const SACompanyCountry = require("../Admin-Models/SACompanyCountry.model");
const branchCreate = require("../Admin-Models/SACompanyBranches.model")
const authController = require("../Admin-controllers/auth");

const imageStorage = multer.diskStorage({
    // Destination to store image
    destination: "./Public/logos/",
    filename: (req, file, cb) => {
      let files = fs.readdirSync("./Public/logos");
      if(!files.includes(req.body.saCompanyName + " LOGO"))
      cb(null,req.body.saCompanyName + " LOGO");
      // file.fieldname is name of the field (image)
      // path.extname get the uploaded file extension
      else{
        fs.unlinkSync("./Public/logos/"+req.body.saCompanyName + " LOGO")
        cb(null,req.body.saCompanyName + " LOGO");
      }
    },
  });
const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 10000000, // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) {
        // upload only png and jpg format
        return cb(new Error("Please upload a Image"));
      }
      cb(undefined, true);
    },
  });

  /**
   * @method create
   * @description this method will create new Super Admin Company
   * @param req
   * @param res
   * @returns void
   */
  routerSACompany.post("/",imageUpload.single("logoValue"), 
  async (req, res) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        const defaultBranch = Boolean(req.body.defaultBranch);
        const payload = {
          saCompanyName: req.body.saCompanyName,
          saCompanyWebsite: req.body.saCompanyWebsite,
          saCompanyLogo: req.body.saCompanyName + " LOGO",
          saCompanyAddress: req.body.saCompanyAddress,
          saCountryId: Number(req.body.saCountryId),
          saStateId: Number(req.body.saStateId),
          saCityId: Number(req.body.saCityId),
          saCompanyZip: req.body.saCompanyZip,
          saFirstName: req.body.saFirstName,
          saLastName: req.body.saLastName,
          saPrimaryEmail: req.body.saPrimaryEmail,
          saAlternateEmail: req.body.saAlternateEmail,
          saPrimaryNumber: Number(req.body.saPrimaryNumber),
          saAlternateNumber: Number(req.body.saAlternateNumber),
          saCompanyTax: req.body.saCompanyTax,
          saPrimaryCurrency: Number(req.body.saPrimaryCurrency),
          paSaGlobalCompanyId: Number(req.body.paSaGlobalCompanyId),
          status: Boolean(req.body.status),
          createdSAId: Number(req.body.createdSAId),
          modifiedSAId: Number(req.body.modifiedSAId),
        };
        await SACompanyCountry.create(payload)
          .then(async (data) => {
            if(defaultBranch==true){
            const branchPayload = {
              saBranchName: req.body.saCompanyName,
              saBranchAddress:req.body.saCompanyAddress,
              saBranchCountryId:Number(req.body.saCountryId),
              saBranchStateId:Number(req.body.saStateId),
              saBranchCityId:Number(req.body.saCityId),
              saBranchZip:req.body.saCompanyZip,
              saBranchFirstName:req.body.saFirstName,
              saBranchLastName:req.body.saLastName,
              saBranchPrimEmail:req.body.saPrimaryEmail,
              saBranchAltEmail:req.body.saAlternateEmail,
              saBranchPrimNum:Number(req.body.saPrimaryNumber),
              saBranchAltNum:Number(req.body.saAlternateNumber),
              saBranchSecCurrency: Number(req.body.saPrimaryCurrency),
              paSaGlobalCompanyId:Number(req.body.paSaGlobalCompanyId),
              saCompanyCountryId: data.id,
              status: Boolean(req.body.status),
              createdSAId: Number(req.body.createdSAId),
              modifiedSAId: Number(req.body.modifiedSAId),
            }
            await branchCreate.create(branchPayload)
            .then((resUser)=>{
              res.send(data);
            })
          }
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the SACompanyCountry.",
            });
          });
      }
    } catch (error) {
      console.log(error);
    }
  },
  )

  /**
   * @method create
   * @description this method will create new Super Admin Company
   * @param req
   * @param res
   * @returns void
   */
  routerSACompany.put("/:id",imageUpload.single("logoValue"), 
  async (req, res) => {
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
        SACompanyCountry.update(req.body, {
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Company Country was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Company Country with id=${id}. Maybe Company COuntry was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Company Country with id=" + id,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  )

  routerSACompany.get("/get-all/:id", async (req, res) => {
    const id = req.body.fclBookingIdFk;
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
        const search = JSON.parse(req.query.search);
        let query = 'select scc.id, scc."saCompanyName", scc."saCompanyWebsite", scc."saCompanyLogo",\
        scc."saCompanyAddress",scc."saCountryId", scc."saStateId", scc."saStateId", scc."saCityId",\
        scc."saCompanyZip", scc."saFirstName", scc."saLastName", scc."saPrimaryEmail", scc."saAlternateEmail",\
        scc."saPrimaryNumber", scc."saAlternateNumber", scc."saCompanyTax", scc."saPrimaryCurrency", scc.status,\
        scc."createdSAId", scc."modifiedSAId",\
        (select ss."stateName") as "stateName",\
        (select sc2."cityName")as "cityName",\
        concat(sl."paSaFirstName",\' \',sl."paSaLastName") as "createdPerson",\
        (select sc."countryName") as "country",\
        (select sc3."currencyCode") as "currency",\
        concat(scc."saCompanyAddress",\', \',"cityName",\', \',"stateName",\'-\',scc."saCompanyZip") as "Address"\
        from sa_country_companies scc left join sa_logins sl on sl.id = scc."createdSAId" \
        left join sc_countries sc on sc.id = scc."saCountryId" left join sc_states ss on ss.id = scc."saStateId" \
        left join sc_cities sc2 on sc2.id = scc."saCityId" left join sc_currencies sc3 on sc3.id = scc."saPrimaryCurrency"\
        where scc."paSaGlobalCompanyId" = '+id+' and';
        if (search.saCompanyName !== null && search.saCompanyName !== "" ) {
          query +=' LOWER(scc."saCompanyName") like \'%' +search.saCompanyName.toLowerCase() +"%' and ";
        }
        if (search.Address !== null && search.Address !== "" ) {
          query +=' LOWER(scc."saCompanyAddress") like \'%' + search.Address.toLowerCase() +"%' or ";
          query +=' LOWER(ss."stateName") like \'%' + search.Address.toLowerCase() +"%' or ";
          query +=' LOWER(scc."saCompanyZip") like \'%' + search.Address.toLowerCase() +"%' or ";
          query +=' LOWER(sc2."cityName") like \'%' + search.Address.toLowerCase() +"%' and ";
        }
        if (search.country !== null && search.country !== "" ) {
          query +=' LOWER(sc."countryName") like \'%' +search.country.toLowerCase() +"%' and ";
        }
        if (search.saPrimaryEmail !== null && search.saPrimaryEmail !== "" ) {
          query +=' LOWER(scc."saPrimaryEmail") like \'%' +search.saPrimaryEmail.toLowerCase() +"%' and ";
        }
        if (search.saCompanyWebsite !== null && search.saCompanyWebsite !== "" ) {
          query +=' LOWER(scc."saCompanyWebsite") like \'%' +search.saCompanyWebsite.toLowerCase() +"%' and ";
        }
        if (search.saCompanyLogo !== null && search.saCompanyLogo !== "" ) {
          query +=' LOWER(scc."saCompanyLogo") like \'%' +search.saCompanyLogo.toLowerCase() +"%' and ";
        }
        if (search.saCompanyTax !== null && search.saCompanyTax !== "" ) {
          query +=' LOWER(sc."saCompanyTax") like \'%' +search.saCompanyTax.toLowerCase() +"%' and ";
        }
        if (search.currency !== null && search.currency !== "" ) {
          query +=' LOWER(sc3."currencyCode") like \'%' +search.currency.toLowerCase() +"%' and ";
        }
        query += " true LIMIT " + req.query.limit + " OFFSET " + req.query.limit * req.query.currentPage;
        db.query(query)
          .then((data) => {
            db.query(
              'select count(scc."id") from sa_country_companies scc where scc."paSaGlobalCompanyId" = '+id 
              ).then((count) => {
              const response = {
                count: count[0][0].count,
                data: data[0],
                currentPage: req.query.currentPage,
                limit: req.query.limit,
                file:(path.join(__dirname,"../public/logos/"))
              };
              res.send(response);
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving VAS with Booking Id=" + id,
            });
          });
      } 
    }catch (error) {
      console.log(error.message);
    }
  });

  routerSACompany.get("/view/:id", async (req, res) => {
    try {
      const auth = await authController.authorizeToken(req).then((result) => {
        return result;
      });
      if (!auth) {
        res.status(401).send({
          message: "Unauthorized.",
        });
      } else {
        console.log('HI-')
        let query = 'select scc.id, scc."saCompanyName", scc."saCompanyWebsite", scc."saCompanyLogo",\
        scc."saCompanyAddress",scc."saCountryId", scc."saStateId", scc."saStateId", scc."saCityId",\
        scc."saCompanyZip", scc."saFirstName", scc."saLastName", scc."saPrimaryEmail", scc."saAlternateEmail",\
        scc."saPrimaryNumber", scc."saAlternateNumber", scc."saCompanyTax", scc."saPrimaryCurrency", scc.status,\
        scc."createdSAId", scc."modifiedSAId",\
        (select ss."stateName") as "stateName",\
        (select sc2."cityName")as "cityName",\
        (select sc."countryName") as "country",\
        (select sc3."currencyCode") as "currency"\
        from sa_country_companies scc left join sa_logins sl on sl.id = scc."createdSAId"\
        left join sc_countries sc on sc.id = scc."saCountryId" left join sc_states ss on ss.id = scc."saStateId" \
        left join sc_cities sc2 on sc2.id = scc."saCityId" left join sc_currencies sc3 on sc3.id = scc."saPrimaryCurrency"\
        where scc."paSaGlobalCompanyId" =' +req.query.paSaGlobalCompanyId+ 'and scc.id='+ req.params.id;
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
  });

module.exports = routerSACompany;