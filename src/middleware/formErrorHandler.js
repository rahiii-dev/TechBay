const { validationResult } = require("express-validator");

const handleFormValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorObj = {};

    errors.array().forEach((error) => {
      errorObj[error.path + "Error"] = error.msg;
      errorObj[error.path] = error.value;
    });

    for (let key in req.body) {
      if (!errorObj[key] && req.body[key]) {
        errorObj[key] = req.body[key];
      }
    }

    req.flash("errorObj", errorObj);
    const reqUrl = req.originalUrl.split("?")[0];
    return res.redirect(reqUrl);
  }

  next();
};   

module.exports = handleFormValidation;
