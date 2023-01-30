const mongoose = require("mongoose");
const BoothList = new mongoose.Schema(
  {
    Booth_No: {
      type: Number,
      trim: true,
    },
    Name_2023: {
      type: String,
      trim: true,
    },
    GF_Key: {
      type: String,
      trim: true,
    },
  },

  { timestamps: true }
);

// userdata.index({ location_1: "2dsphere" });
module.exports = new mongoose.model("booth_list", BoothList);
