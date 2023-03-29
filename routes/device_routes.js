const express = require("express");
const { createDevice, getDevices } = require("../controllers/deviceController");
const asyncMiddleware = require("../middlewares/async");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.route("/").post(protect, asyncMiddleware(createDevice));
router.route("/").get(protect, asyncMiddleware(getDevices));
module.exports = router;
