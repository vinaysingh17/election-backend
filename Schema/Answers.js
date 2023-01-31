const mongoose = require("mongoose");
const userdata = new mongoose.Schema(
  {
    language: {
      type: String,
      enum: ["kannada", "hindi", "english"],
    },
    surveyBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    date: String,
    answer: {
      type: Number,
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
    },
    mobile: {
      type: Number,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);
// userdata.index({ location: "2dsphere" });

// userdata.index({ location_1: "2dsphere" });
module.exports = new mongoose.model("answer", userdata);
