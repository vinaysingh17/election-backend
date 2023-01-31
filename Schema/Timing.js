const mongoose = require("mongoose");
const userdata = new mongoose.Schema(
  {
    login: {
      type: String,
    },
    logout: {
      type: String,
      default: null,
    },
    location: {},
    surveyBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    date: String,
  },

  { timestamps: true }
);
// userdata.index({ location: "2dsphere" });

// userdata.index({ location_1: "2dsphere" });
module.exports = new mongoose.model("timing", userdata);
