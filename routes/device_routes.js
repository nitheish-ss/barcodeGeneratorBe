const express = require("express");
const {
  createDevice,
  getDevices,
  getDeviceById,
  deleteDeviceById,
} = require("../controllers/deviceController");
const asyncMiddleware = require("../middlewares/async");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.route("/").post(protect, asyncMiddleware(createDevice));
router.route("/:id").get(protect, asyncMiddleware(getDeviceById));
router.route("/").get(protect, asyncMiddleware(getDevices));
router.route("/:id").delete(protect, asyncMiddleware(deleteDeviceById));
module.exports = router;
