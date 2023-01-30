const mongoose = require("mongoose");
const VotorList = new mongoose.Schema(
  {
    AC_NO: {
      type: Number,
      trim: true,
    },
    Booth_No: {
      type: Number,
      trim: true,
    },
    EPIC_No: {
      type: String,
      trim: true,
    },
    Relative_Name: {
      type: String,
      trim: true,
    },
    Sec_No: {
      type: Number,
      trim: true,
    },
    Voter_Name: {
      type: String,
      trim: true,
    },
    Voter_No: {
      type: Number,
      trim: true,
    },
    age: {
      type: Number,
      trim: true,
    },
    sex: {
      type: String,
      trim: true,
    },
  },

  { timestamps: true }
);

// userdata.index({ location_1: "2dsphere" });
module.exports = new mongoose.model("votor_list", VotorList);
