const express = require("express");
const errorHandler = require("../middlewares/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/v1/auth", require("../routes/auth_routes"));
  app.use(errorHandler);
};
