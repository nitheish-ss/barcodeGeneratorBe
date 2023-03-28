const config = require("../startup/config");
const Device = require("../models/deviceModel");
const createDevice = async (req, res, next) => {

  const device = new Device({
    brandAndModel: req.body.brandAndModel,
    customFields: req.body.customFields,
  });

  device.save().then((result) => {
    res.status(201).json({
      success: true,
      message: "Device added successfully",
      data: result,
    });
  });
};
module.exports = { createDevice };
