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

const searchDevice = async (req, res, next) => {
  const {
    pageNo,
    perPage,
    brand = null,
    model = null,
    imei = null,
    ram = null,
    rom = null,
    romUnit = null,
    purchasedFrom = null,
    purchasedFromContactNo = null,
    purchaseCost = null,
    purchaseDate = null,
    deviceCondition = null,
    soldTo = null,
    soldToContactNo = null,
    soldPrice = null,
    soldDate = null,
    profit = null,
  } = req.query;
  const skipCount = pageNo * perPage;
  const query = {
    ...(brand && { brand: new RegExp(brand, "i") }),
    ...(model && { model: new RegExp(model, "i") }),
    ...(imei && { imei: imei }),
    ...(ram && { ram: ram }),
    ...(rom && { rom: rom }),
    ...(romUnit && { romUnit: new RegExp(romUnit, "i") }),
    ...(purchasedFrom && { purchasedFrom: new RegExp(purchasedFrom, "i") }),
    ...(purchasedFromContactNo && {
      purchasedFromContactNo: new RegExp(purchasedFromContactNo, "i"),
    }),
    ...(purchaseCost && { purchaseCost: purchaseCost }),
    ...(purchaseDate && { purchaseDate: purchaseDate }),
    ...(deviceCondition && {
      deviceCondition: new RegExp(deviceCondition, "i"),
    }),
    ...(soldTo && { soldTo: new RegExp(soldTo, "i") }),
    ...(soldToContactNo && {
      soldToContactNo: new RegExp(soldToContactNo, "i"),
    }),
    ...(soldPrice && { soldPrice: soldPrice }),
    ...(soldDate && { soldDate: soldDate }),
    ...(profit && { profit: profit }),
  };
  const count = await Device.countDocuments(query);
  try {
    const devices = await Device.find(query)
      .skip(skipCount)
      .limit(perPage)
      .exec();

    res.json({ success: true, data: devices, count: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const uploadBulkDeviceData = async (req, res, next) => {
  const devicesList = req?.body;
  try {
    const data = await Device.updateMany(devicesList, { upsert: true });
    if (data.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Device List Upload Failed" });
    }
    return res.status(200).json({
      success: true,
      message: "Device List Uploaded Successfully",
    });
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
  searchDevice,
  uploadBulkDeviceData,
};
