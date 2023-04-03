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

const getDeviceById = async (req, res, next) => {
  const id = req?.params?.id;
  try {
    const data = await Device.findById(id);
    if (!data) {
      return res
        .status(400)
        .json({ success: false, error: "Device doesnot exist" });
    }
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

const deleteDeviceById = async (req, res, next) => {
  const id = req?.params?.id;
  try {
    const result = await Device.deleteOne({ _id: id });
    console.log(result);
    return res
      .status(200)
      .json({ success: true, message: "Device Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

const updateDeviceById = async (req, res, next) => {
  const id = req?.params?.id;
  const device = new Device(req.body);
  try {
    await Device.updateOne({ _id: id }, device);
    return res
      .status(200)
      .json({ success: true, message: "Device Updated Successfully" });
  } catch (error) {
    next(error);
  }
};

const getDeviceByImei = async (req, res, next) => {
  const imei = req?.params?.imei;
  try {
    const data = await Device.findOne({ imei: imei });
    if (!data) {
      return res
        .status(400)
        .json({ success: false, error: "Device doesnot exist" });
    }
    return res.status(200).json({ _id: data?._id });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createDevice,
  getDevices,
  getDeviceById,
  deleteDeviceById,
  updateDeviceById,
  getDeviceByImei,
};
