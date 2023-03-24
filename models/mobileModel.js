const mongoose = require('mongoose');

// define schema
const mobileSchema = new mongoose.Schema({
  brandAndModel: {
    type: String,
    required: true
  },
  customFields: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// create model from schema
const Mobile = mongoose.model('Mobile', mobileSchema);

// export model
module.exports = Mobile;
