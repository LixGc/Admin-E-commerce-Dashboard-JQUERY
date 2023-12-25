function errorHandler(error, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";
  console.log(error, "INI ERROR HANDLER");
  if (error.name === "unauthenticated" || error.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid Token";
  } else if (error.name === "not_found") {
    status = 401;
    message = `Cuisine id ${error.id} not found`;
  } else if (error.name === "forbidden") {
    status = 403;
    message = "No access!";
  } else if (error.name === "not_valid") {
    status = 401;
    message = `Invalid email or password`;
  } else if (error.name === "invalid_email_or_password") {
    status = 400;
    message = "Email or Password is required";
  } else if (error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeValidationError" || error.name === "ValidationErrorItem") {
    status = 400;
    message = error.errors[0].message;
  } else if (error.name === "Data not found!") {
    status = 404;
    message = "Data is not found!";
  } else if (error.name === `Cuisine with id ${error.id} is not found!`) {
    status = 404;
    message = `Cuisine with id ${error.id} is not found!`;
  } else if (error.name === `data_not_found`) {
    status = 404;
    message = `Data is not found!`;
  }
  res.status(status).json({ message });
}

module.exports = errorHandler;
