const { validationResult } = require("express-validator");

const handleFormValidation = (renderPagePath, renderPageTiltle = "Tech Bay") => {
  return (req, res, next) => {
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

      return res.render(renderPagePath, { title: renderPageTiltle, errorObj });
    }

    next();
  };
}

module.exports = handleFormValidation;