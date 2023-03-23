const express = require("express");
const config = require("./startup/config");
const { connectDb } = require("./services/connectMongoDb");
require("express-async-errors");

const app = express();
connectDb();
require("./startup/prod")(app);
require("./startup/routes")(app);

app.listen(config.PORT, () =>
  console.log(`Server running on port ${config.PORT}`)
);
