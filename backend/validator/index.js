exports.createPostValidator = (req, res, next) => {
  req.check("title", "Title is required.").notEmpty();
  req.check("title", "Titlle must be between 4 and 150 characters.").isLength({
    min: 4,
    max: 150
  });

  req.check("body", "Body is required.").notEmpty();
  req.check("body", "Body must be between 4 and 2000 characters.").isLength({
    min: 4,
    max: 2000
  });

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }

  next();
}

exports.userSignupValidator = (req, res, next) => {
  req.check("name", "Name is required.").notEmpty();

  req.check("email", "Email must be between 3 to 32 characters.")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 2000
    });

  req.check("password", "Password is required.").notEmpty();
  req.check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters.")
    .matches(/\d/)
    .withMessage("Password must contain a number.");

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }

  next();
}