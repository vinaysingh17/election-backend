const mongoose = require("mongoose");
const userdata = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
      trim: true,
    },
    EPIC_No: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    GF_KEY: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    mobile: {
      type: Number,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      // require: true,
      // unique: true,
      match:
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },

    role: {
      type: String,
      require: true,
      enum: ["ground"],
    },

    password: {
      type: "String",
      require: true,
    },

    avatar: {
      type: String,
      default: null,
    },
  },

  { timestamps: true }
);
// userdata.index({ location: "2dsphere" });

// userdata.index({ location_1: "2dsphere" });
module.exports = new mongoose.model("ground_user", userdata);
