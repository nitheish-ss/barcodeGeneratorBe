const config = require("../startup/config");
const Device = require("../models/deviceModel");
const createDevice = async (req, res, next) => {
  const device = new Device(req.body);
  device
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: "Device added successfully",
      });
    })
    .catch((error) => {
      if (error?.code === 11000) {
        res.status(400).json({
          success: false,
          error: "Device already exist",
        });
      } else {
        next(error);
      }
    });
};

const getDevices = async (req, res, next) => {
  const pageNumber = req?.query?.pageNo;
  const perPage = req?.query?.perPage;
  const skipCount = pageNumber * perPage;
  const count = await Device.countDocuments();
  const data = await Device.find().skip(skipCount).limit(perPage);
  res.status(200).json({
    success: true,
    data: data,
    count: count,
  });
};

module.exports = { createDevice, getDevices };
