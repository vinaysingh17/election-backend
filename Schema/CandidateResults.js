const mongoose = require("mongoose");
var SchemaTypes = mongoose.Schema.Types;
const BoothList = new mongoose.Schema(
  {
    Year: {
      type: Number,
      trim: true,
    },
    Position: {
      type: Number,
      trim: true,
    },
    Candidate: {
      type: String,
      trim: true,
    },
    Party: {
      type: String,
      trim: true,
    },
    Votes: {
      type: Number,
      trim: true,
    },
    Votes_percentage: {
      type: String,
      trim: true,
    },
  },

  { timestamps: true }
);

// userdata.index({ location_1: "2dsphere" });
module.exports = new mongoose.model("candidate_result", BoothList);
