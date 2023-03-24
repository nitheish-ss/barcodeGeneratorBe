const config = require("../startup/config");
const Mobile = require("../models/mobileModel");
const createMobile = async (req, res, next) => {
  const mobile = new Mobile({
    brandAndModel: req.body.brandAndModel,
    customFields: req.body.customFields,
  });

  mobile.save().then((result) => {
    res.status(201).json({
      success: true,
      message: "Mobile added successfully",
      data: result,
    });
  });
};
module.exports = { createMobile };
