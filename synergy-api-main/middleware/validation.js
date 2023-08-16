const isEmail = require('validator').isEmail;
const pool = require('../db');


module.exports.signupValidation = async (req, res, next) => {
  try {
    const credentials = req.body;
    console.log(credentials);
    const errors = { userEmail: "", password: "", userName: "", error: false };
    const userEmail = await pool.query("SELECT email FROM users WHERE email = '"+credentials.email+"'");
    if (userEmail.rows?.length > 0) {
      errors.userEmail = "user userEmail already exist";
      res.status(400).json({ errors });
      return;
    }
    if (credentials.userName.length < 6) {
      errors.userName = "userName should be at least 6 characters";
      errors.error = true;
    }
    if (credentials.password.length < 6) {
      errors.password = "password should be at least 6 characters";
      errors.error = true;
    }

    if (!isEmail(credentials.email)) {
      errors.userEmail = "userEmail are not valid";
      errors.error = true;
    }
    if (errors.error) {
      res.status(400).json({ errors });
    } else {
      next();
    }
  } catch (error) {
    res.status(400).send('not valid credetials');
    console.log(error.message);
  }
}

module.exports.loginValidation = async (req, res, next) => {
  try {
    const { email } = req.body;
    const errors = { userEmail: "" };
    const userEmail = await pool.query("SELECT email FROM users WHERE email = '"+email+"'");
    if (userEmail.rows?.length === 0) {
      errors.userEmail = "userEmail are not exist";
      res.status(400).json({ errors });
    } else {
      next();
    }
  } catch (err) {
    console.log(err.message);
  }
};