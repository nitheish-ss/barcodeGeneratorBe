const mongoose = require("mongoose");
const config = require("../startup/config");

const connectDb = () =>
  mongoose
    .connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

module.exports = { connectDb };
