const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../startup/config");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (config.APP_USER_EMAIL !== email)
    return res
      .status(403)
      .json({ success: false, message: "User Not Registered yet" });

  let validPassword = await bcrypt.compare(password, config.APP_USER_PASSWORD);

  if (!validPassword)
    return res
      .status(403)
      .json({ success: false, message: "Invalid Email or Password" });

  const token = jwt.sign(
    {
      id: 1,
      email: config.APP_USER_EMAIL,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    config.JWT_PRIVATE_KEY
  );

  return res
    .status(200)
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .json({ success: true, message: "User Vrified Successfully" });
};

module.exports = { loginUser };
