const mongoose = require("mongoose");
const VotorList = new mongoose.Schema(
  {
    AC_NO: {
      type: String,
      // type:
      trim: true,
      default: null,
    },
    Booth_No: {
      type: String,

      trim: true,
      default: null,
    },
    EPIC_No: {
      type: String,
      trim: true,
      default: null,
    },
    First_Name: {
      type: String,
      trim: true,
      default: null,
    },
    Last_Name: {
      type: String,
      trim: true,
      default: null,
    },
    Relative_First_Name: {
      type: String,
      trim: true,
      default: null,
    },
    Relative_Last_Name: {
      type: String,
      trim: true,
      default: null,
    },
    Relation_Type: {
      type: String,
      trim: true,
      default: null,
    },
    Sec_No: {
      type: String,
      trim: true,
      default: null,
    },
    SRNO: {
      type: String,
      trim: true,
      default: null,
      default: null,
    },
    Voter_Name: {
      type: String,
      trim: true,
      default: null,
    },
    Voter_No: {
      type: String,
      trim: true,
      default: null,
    },
    age: {
      type: String,
      trim: true,
      default: null,
    },
    sex: {
      type: String,
      trim: true,
      default: null,
    },
    Voter_Mobile_Number: Number,
    Caste: {
      type: String,
      trim: true,
      default: null,
    },
    Sub_Caste: {
      type: String,
      trim: true,
      default: null,
    },
    Voter_Favour_Party: {
      type: String,
      trim: true,
      default: null,
    },
    Is_Voter_Available_At_Election: {
      type: String,
      trim: true,
      default: null,
    },
  },

  { timestamps: true }
);

// userdata.index({ location_1: "2dsphere" });
module.exports = new mongoose.model("votor_list", VotorList);
