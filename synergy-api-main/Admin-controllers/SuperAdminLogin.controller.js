const db = require("../db");
var _ = require("lodash");
const superAdmin = require("../Admin-Models/SuperAdminLogin.model");
const authController = require("../Admin-controllers/auth");
const bcrypt = require("bcrypt");

module.exports = {
  /**
   * @method getAll
   * @description this method will fetch all Super Admin Login data
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
          }
          else {
        const search = JSON.parse(req.query.search)
      let query = 
        'select sl.id,sl."paSaEmail",sl."paSaContactNumber" as "paSaPhone",sl."paSaFirstName", sl."paSaLastName",sl."paSaUserName",\
        sl."role",sl."paSaPassword",sl."paSaCreatedLoginId", sl."paSaCompanyId",\
        case when CAST(coalesce(sl."paSaStatus", \'true\') AS boolean) = true then true \
        when CAST(coalesce(sl."paSaStatus", \'false\') AS boolean) = false then false end as "status",\
        concat(sl."paSaFirstName",\' \',sl."paSaLastName") as "superAdminName" ,\
        concat(pl."paFirstName",\' \',pl."paLastName") as "createdPerson",\
        (select pgc."paSaCompanyName")as "companyName"\
        from sa_logins sl left join pa_logins pl on pl.id = sl."paSaCreatedLoginId" \
        left join pa_global_companies pgc on pgc.id = sl."paSaCompanyId" WHERE sl."paSaCompanyId" ='+req.query.companyId+'and'
        if (search.companyName !== null && search.companyName !== '') {
            query += " LOWER(pgc.\"paSaCompanyName\") like '%" + search.companyName.toLowerCase() + "%' and "
          }
          if (search.superAdminName !== null && search.superAdminName !== '') {
              query += " LOWER(sl.\"paSaFirstName\") like '%" + search.superAdminName.toLowerCase() + "%' or "
              query += " LOWER(sl.\"paSaLastName\") like '%" + search.superAdminName.toLowerCase() + "%' and "
            }
          if (search.paSaEmail !== null && search.paSaEmail !== '') {
              query += " LOWER(sl.\"paSaEmail\") like '%" + search.paSaEmail.toLowerCase() + "%' and "
            }
          if (search.paSaPhone !== null && search.paSaPhone !== '') {
            query += ' CAST(sl."paSaContactNumber" AS VARCHAR) like \'%' +search.paSaPhone +"%' and ";
          }
          if (search.createdPerson !== null && search.createdPerson !== '') {
            query += " LOWER(pl.\"paFirstName\") like '%" + search.createdPerson.toLowerCase() + "%' or "
            query += " LOWER(pl.\"paLastName\") like '%" + search.createdPerson.toLowerCase() + "%' and "
          }
          query += " true LIMIT " + req.query.limit + " OFFSET " +req.query.limit * req.query.currentPage;
          db.query(query)
            .then((data) => {
              db.query(
                'select count(sa_logins.id) from sa_logins where sa_logins."paSaCompanyId" ='+req.query.companyId
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
              err.message || "Some error occurred while retrieving superAdmin.",
          });
        });
    }
 } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method create
   * @description this method will create new Super Admin Login
   * @param req
   * @param res
   * @returns void
   */
  create: async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
      const payload = {
        paSaFirstName:req.body.paSaFirstName,
        paSaLastName:req.body.paSaLastName,
        paSaUserName:req.body.paSaUserName,
        paSaEmail:req.body.paSaEmail,
        paSaContactNumber:req.body.paSaPhone,
        paSaEmployeePassword:req.body.paSaEmployeePassword,
        paSaPassword:await bcrypt.hash(req.body.paSaPassword, salt),
        role:req.body.role,
        paSaCreatedLoginId:req.body.paSaCreatedLoginId,
        paSaCompanyId:req.body.paSaCompanyId,
        modifiedBy:req.body.modifiedBy,
        paSaStatus:req.body.status,
      };
      await superAdmin.create(payload)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {;
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the Super Admin Login.",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method find
   * @description this method will Find and Show Super Admin Login data based on id
   * @param req
   * @param res
   * @returns void
   */
  find: async (req, res, next) => {
    try {
      const id = req.params.id;
      superAdmin.findByPk(id)
        .then((data) => {
          if (data) {
            res.send(data);
          } else {
            res.status(404).send({
              message: `Cannot find Super admin login with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error retrieving Super admin login with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method update
   * @description this method will update Super Admin Login data based on id
   * @param req
   * @param res
   * @returns void
   */
  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const salt = await bcrypt.genSalt();
      const payload = {
        paSaFirstName:req.body.paSaFirstName,
        paSaLastName:req.body.paSaLastName,
        paSaUserName:req.body.paSaUserName,
        paSaEmail:req.body.paSaEmail,
        paSaContactNumber:req.body.paSaPhone,
        paSaEmployeePassword:req.body.paSaEmployeePassword,
        paSaPassword:await bcrypt.hash(req.body.paSaPassword, salt),
        role:req.body.role,
        paSaCreatedLoginId:req.body.paSaCreatedLoginId,
        paSaCompanyId:req.body.paSaCompanyId,
        modifiedBy:req.body.modifiedBy,
        paSaStatus:req.body.status,
      };
      superAdmin.update(payload, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Super Admin login was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update Super Admin login with id=${id}. Maybe Super Admin login was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Super Admin login with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  /**
   * @method delete
   * @description this method will delete Super Admin Login data based on id
   * @param req
   * @param res
   * @returns void
   */
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      superAdmin.destroy({
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Super Admin Login was deleted successfully!",
            });
          } else {
            res.send({
              message: `Cannot delete Super Admin Login with id=${id}. Maybe Super Admin Login was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Could not delete Super Admin Login with id=" + id,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  },
};
