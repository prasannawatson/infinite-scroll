const pool = require("../db");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../Admin-Models/User.model");
const tokenModel = require("../User-Models/authtokens");
const authController = require("../User-controllers/auth");

const tokenList = {};

const createToken = (id) => {
  return jwt.sign({ id }, "salah95920350");
};

module.exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    if(role=='Employee'||role=='Admin'){
    const data = await pool.query(
      'select u."employeeId"  as "id" , u.email , u."password" , \
      u."paSaGlobalCompanyId",u."userRole" ,\
      u."saCountryCompanyId",\
      (select se."employeeRole") as "employeeRole",\
      (select sr.privilege) as "access",\
      (select sba."branchNameId") as "saBranchId",\
      concat(u."firstName", \' \',u."lastName") as "username"\
      FROM users u left join sc_employees se on\
      se."empEmail" = email left join sc_roles sr on\
      sr.id = se."employeeRole" left join sc_branch_assignings sba on sba."employeeId" = u."employeeId" \
      WHERE email = (:email) and se."empStatus"=\'ACTIVE\' and sba."defaultBranch" = true', {
      replacements:{email:req.body.email}
      }
    );
    const user=data[0];
    if (user.length > 0) {
      const isValidPassword = await bcrypt.compare(password, user[0].password);
      if (isValidPassword) {
        const payload = {
          email: email,
        };
        const token = jwt.sign(payload, "SYNERGY", { expiresIn: "5h" });
        const refreshToken = jwt.sign(payload, "SYNERGY", { expiresIn: "5h" });
        res.cookie("token", token, { maxAge: 900000, httpOnly: false });
        const response = {
          email: user[0].email,
          token: token,
          refreshToken: refreshToken,
          companyCountryId : user[0].saCountryCompanyId,
          companyId : user[0].paSaGlobalCompanyId,
          companyBranchId: user[0].saBranchId,
          role:user[0].userRole,
          privilege: user[0].access,
          id:user[0].id,
          username: user[0].username,
        };
        tokenList[refreshToken] = response;
        var expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 3);
        const tokenData = {
          userId: user[0].id,
          userEmail: user[0].email,
          token: token,
          expireTime: expireDate,
        };
        tokenModel
          .create(tokenData)
          .then(() => {
            res.status(200).json(response);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "Some error occurred while login.",
            });
          });
      } else {
        res.status(400).json({ errors: { password: "wrong password added" } });
      }
    } else {
      res.status(400).json({ errors: { user: "user not founded" } });
    }
  }
  if(role=='Super-Admin'){
    const data = await pool.query(
      'select sl.id,sl."paSaEmail" as email,sl."paSaCompanyId" as "globalCompanyId", sl."paSaPassword" as password, sl."role",\
      (select pgc."paSaCompanyName") as "companyName",\
      concat(sl."paSaFirstName", \' \', sl."paSaLastName")as "userName"\
      from sa_logins sl \
      left join pa_global_companies pgc on pgc.id = sl."paSaCompanyId"  where sl."paSaEmail" =(:email) and sl."paSaStatus" = \'true\'',{
        replacements: {email:email}
      }
    );
    const user=data[0];
    if (user.length > 0) {
      const isValidPassword = await bcrypt.compare(password, user[0].password);
      if (isValidPassword) {
        const payload = {
          email: email,
        };
        const token = jwt.sign(payload, "SYNERGY", { expiresIn: "5h" });
        const refreshToken = jwt.sign(payload, "SYNERGY", { expiresIn: "5h" });
        res.cookie("token", token, { maxAge: 900000, httpOnly: false });
        const response = {
          email: user[0].email,
          companyId : user[0].globalCompanyId,
          token: token,
          refreshToken: refreshToken,
          role:role,
          username: user[0].userName,
          id:user[0].id,
        };
        tokenList[refreshToken] = response;
        var expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 3);
        const tokenData = {
          userId: user[0].id,
          userEmail: user[0].email,
          token: token,
          expireTime: expireDate,
        };
        tokenModel
          .create(tokenData)
          .then(() => {
            res.status(200).json(response);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "Some error occurred while login.",
            });
          });
      } else {
        res.status(400).json({ errors: { password: "wrong password added" } });
      }
    } else {
      res.status(400).json({ errors: { user: "user not founded" } });
    }
  }
  if(role=='Power-Admin'){
    const data = await pool.query(
      'select pl.id ,pl."paEmail" ,pl."paPassword",\
      concat(pl."paFirstName",\' \',pl."paLastName") as "userName" \
      from pa_logins pl where pl."paEmail" = (:email)',{
        replacements: {email:email}
      }
      );
    const user =data[0];
    if (user.length > 0) {
      const isValidPassword = await bcrypt.compare(password, user[0].paPassword);
      if (isValidPassword) {
        const payload = {
          email: email,
        };
        const token = jwt.sign(payload, "SYNERGY", { expiresIn: "5h" });
        const refreshToken = jwt.sign(payload, "SYNERGY", { expiresIn: "5h" });
        res.cookie("token", token, { maxAge: 900000, httpOnly: false });
        const response = {
          email: user[0].paEmail,
          token: token,
          refreshToken: refreshToken,
          role:role,
          username:user[0].userName,
          id:user[0].id,
        };
        tokenList[refreshToken] = response;
        var expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 3);
        const tokenData = {
          userId: user[0].id,
          userEmail: user[0].paEmail,
          token: token,
          expireTime: expireDate,
        };
        tokenModel
          .create(tokenData)
          .then(() => {
            res.status(200).json(response);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "Some error occurred while login.",
            });
          });
      } else {
        res.status(400).json({ errors: { password: "wrong password added" } });
      }
    } else {
      res.status(400).json({ errors: { user: "user not founded" } });
    }
  }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports.signup = async (req, res) => {
  try {
    let userName = req.body;
    const salt = await bcrypt.genSalt();

    const userPayload = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      mobile: req.body.mobile,
      // hashing
      password: await bcrypt.hash(req.body.password, salt),
      createdBy: req.body.createdBy,
      modifiedBy: req.body.modifiedBy,
    };
    const signup = await UserModel.create(userPayload)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      });
    // inserting
    const token = createToken(signup.rows[0].id);

    res.cookie("token", token, { maxAge: 900000, httpOnly: false });
    res.status(200).json({ userName });
  } catch (err) {
    console.log(err);
  }
};

module.exports.logout = (req, res) => {
  try {
    res.cookie("token", "_blank", {
      maxAge: 1,
    });

    res.status(200).json("user are logout");
  } catch (error) {
    console.log(error);
  }
};

module.exports.verify = async (req, res) => {
  try {
    const token = req.header("authorization").replace("Bearer ", "");
    // const token = req.body.token;
    console.log(token, "okokoo");
    if (token) {
      const verified = jwt.verify(token, "SYNERGY");
      if (verified) {
        return res.send("Successfully Verified");
      } else {
        // Access Denied
        return res.send("Successfully Not Verified");
      }
    } else {
      res.json({ validToken: false });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.authorizeTokenWithAbility = async (req, roles = "") => {
  try {
    const token = req.header("authorization").replace("Bearer ", "");
    if (token) {
      const res = await db
        .query(
          'select u.roles  from auth_tokens auth \
      join users u on u."employeeId" = auth."userId"\
      where "token"=(:token) order by auth."createdAt" desc limit 1',
          {
            replacements: { token: token },
          }
        )
        .then((data) => {
          const userRoles = data[0][0].roles;
          const verified = jwt.verify(token, "SYNERGY");
          if (true && verified) {
            return true;
          } else {
            // Access Denied
            return false;
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
      if (res) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    console.log("Catch");
    return false;
  }
};

module.exports.authorizeToken = async (req, roles = "") => {
  try {
    const token = req.header("authorization").replace("Bearer ", "");
    if (token) {
      const verified = jwt.verify(token, "SYNERGY");
      if (verified) {
        return true;
      } else {
        // Access Denied
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.log("Catch");
    return false;
  }
};
