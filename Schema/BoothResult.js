const mongoose = require("mongoose");
const BoothList = new mongoose.Schema(
  {
    AC_No: {
      type: String,
      trim: true,
    },
    Booth_No: {
      type: Number,
      trim: true,
    },
    Year: {
      type: Number,
      trim: true,
    },
    Winner: {
      type: String,
      trim: true,
    },
    BJP: {
      type: Number,
      trim: true,
    },
    BJP_PER: {
      type: String,
      trim: true,
    },
    INC: {
      type: Number,
      trim: true,
    },
    INC_PER: {
      type: String,
      trim: true,
    },
    JDS: {
      type: Number,
      trim: true,
    },
    JDS_PER: {
      type: String,
      trim: true,
    },
  },

  { timestamps: true }
);

// userdata.index({ location_1: "2dsphere" });
module.exports = new mongoose.model("booth_result", BoothList);
