const express = require("express");
const { loginUser } = require("../controllers/authController");

const asyncMiddleware = require("../middlewares/async");

const router = express.Router();

router.route("/login").post(asyncMiddleware(loginUser));

module.exports = router;
