const jwt = require("jsonwebtoken");
const asyncMiddleware = require("./async");
require("dotenv").config({ path: "./.env" });
const ErrorResponse = require("../utilities/errorResponse");

exports.protect = asyncMiddleware(async (req, res, next) => {
	const token = req.header("x-auth-token");

	if (!token)
		return next(new ErrorResponse("Access Denied. No Token provided", 401));

	try {
		const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
		req.user = decoded;
		next();
	} catch (error) {
		return next(new ErrorResponse("Invalid Token", 401));
	}
});