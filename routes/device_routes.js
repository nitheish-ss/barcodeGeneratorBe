const express = require("express");
const {
  createDevice,
  getDevices,
  getDeviceById,
  deleteDeviceById,
  updateDeviceById,
  getDeviceByImei,
  uploadBulkDeviceData
} = require("../controllers/deviceController");
const asyncMiddleware = require("../middlewares/async");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.route("/").post(protect, asyncMiddleware(createDevice));
router.route("/bulkUpload").post(protect, asyncMiddleware(uploadBulkDeviceData));
router.route("/imei/:imei").get(protect, asyncMiddleware(getDeviceByImei));
router.route("/:id").get(protect, asyncMiddleware(getDeviceById));
router.route("/").get(protect, asyncMiddleware(getDevices));
router.route("/:id").delete(protect, asyncMiddleware(deleteDeviceById));
router.route("/:id").put(protect, asyncMiddleware(updateDeviceById));
module.exports = router;
