const { text } = require("express");
const mongoose = require("mongoose");

// define schema
const deviceSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    imei: {
      type: Number,
      required: true,
    },
    ram: {
      type: Number,
      default: null,
    },
    rom: {
      type: Number,
      default: null,
    },
    deviceCondition: {
      type: String,
      default: null,
    },
    purchasedFrom: {
      type: String,
      default: null,
    },
    purchasedFromContactNo: {
      type: Number,
      default: null,
    },
    purchaseCost: {
      type: Number,
      default: null,
    },
    purchaseDate: {
      type: Date,
      default: null,
    },
    soldTo: {
      type: String,
      default: null,
    },
    soldToContactNo: {
      type: Number,
      default: null,
    },
    soldPrice: {
      type: Number,
      default: null,
    },
    soldDate: {
      type: Date,
      default: null,
    },
    profit: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// create model from schema
const Device = mongoose.model("devices", deviceSchema);

// export model
module.exports = Device;

// brand: "a";
// deviceCondition: null;
// imei: "c";
// model: "b";
// profit: null;
// purchaseCost: null;
// purchaseDate: null;
// purchasedFrom: null;
// purchasedFromContactNo: null;
// ram: null;
// rom: null;
// soldDate: null;
// soldPrice: null;
// soldTo: null;
// soldToContactNo: null;
