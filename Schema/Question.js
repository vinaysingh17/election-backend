const mongoose = require("mongoose");
const userdata = new mongoose.Schema(
  {
    hindi: {
      qustion: String,
      option1: String,
      option2: String,
      option3: String,
      option4: String,
    },
    kannada: {
      qustion: String,
      option1: String,
      option2: String,
      option3: String,
      option4: String,
    },
    english: {
      qustion: String,
      option1: String,
      option2: String,
      option3: String,
      option4: String,
    },
  },

  { timestamps: true }
);
// userdata.index({ location: "2dsphere" });

// userdata.index({ location_1: "2dsphere" });
module.exports = new mongoose.model("question", userdata);
