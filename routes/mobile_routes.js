const express = require("express");
const { createMobile } = require("../controllers/mobileController");
const asyncMiddleware = require("../middlewares/async");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.route("/abc").post(protect, asyncMiddleware(createMobile));

module.exports = router;
