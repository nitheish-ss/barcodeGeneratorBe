const dotenv = require("dotenv");
const path = require("path");
// Set the NODE_ENV variable if it's not already set
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// Load environment variables from the appropriate file

dotenv.config({
  path: path.resolve(__dirname, `../.${process.env.NODE_ENV.trim()}.env`),
});

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  APP_USER_EMAIL: process.env.APP_USER_EMAIL,
  APP_USER_PASSWORD: process.env.APP_USER_PASSWORD,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
};
