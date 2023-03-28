const mongoose = require('mongoose');

// define schema
const deviceSchema = new mongoose.Schema({
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
const Device = mongoose.model('device', deviceSchema);

// export model
module.exports = Device;
