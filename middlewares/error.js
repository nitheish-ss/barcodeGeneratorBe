const ErrorResponse = require("../utilities/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.code === 401) {
    const message = "Unauthorized";
    error = new ErrorResponse(message, 401);
  }

  if (err.code === 403) {
    const message = "Forbidden";
    error = new ErrorResponse(message, 403);
  }

  if (err.code === 404) {
    const message = "Not Found";
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message = "Duplicate Field Value";
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
