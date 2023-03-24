const config = require("../startup/config");

const currentUser = async (req, res, next) => {
  if (req.user.email !== config.APP_USER_EMAIL)
    return res.status(200).json({ success: false, message: "User Not Found" });

  return res
    .status(200)
    .json({ success: true, message: { id: 1, email: config.APP_USER_EMAIL } });
};

module.exports = { currentUser };
