const mongoose = require("mongoose");
const BoothList = new mongoose.Schema(
  {
    AC_No: {
      type: String,
      trim: true,
      default: 0,
    },
    Booth_No: {
      type: Number,
      trim: true,
      default: 0,
    },
    Year: {
      type: Number,
      trim: true,
      default: 0,
    },
    Winner: {
      type: String,
      trim: true,
      // default:0
    },
    BJP: {
      type: Number,
      trim: true,
      default: 0,
    },
    BJP_PER: {
      type: String,
      trim: true,
      default: 0,
    },
    INC: {
      type: Number,
      trim: true,
      default: 0,
    },
    INC_PER: {
      type: String,
      trim: true,
      default: 0,
    },
    JDS: {
      type: Number,
      trim: true,
      default: 0,
    },
    JDS_PER: {
      type: String,
      trim: true,
      default: 0,
    },
  },

  { timestamps: true }
);

// userdata.index({ location_1: "2dsphere" });
module.exports = new mongoose.model("booth_result2", BoothList);
