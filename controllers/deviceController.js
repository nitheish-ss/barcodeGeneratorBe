const config = require("../startup/config");
const Device = require("../models/deviceModel");
const createDevice = async (req, res, next) => {
  const device = new Device(req.body);
  device.save().then(() => {
    res.status(201).json({
      success: true,
      message: "Device added successfully",
    });
  });
};
module.exports = { createDevice };
