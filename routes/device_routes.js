const express = require("express");
const { createDevice } = require("../controllers/deviceController");
const asyncMiddleware = require("../middlewares/async");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.route("/create").post(protect, asyncMiddleware(createDevice));

module.exports = router;
