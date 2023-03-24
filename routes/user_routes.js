const express = require("express");
const { currentUser } = require("../controllers/userController");
const asyncMiddleware = require("../middlewares/async");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.route("/me").get(protect, asyncMiddleware(currentUser));

module.exports = router;