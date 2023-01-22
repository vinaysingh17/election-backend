const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const mongoUri = dotenv.parsed.MONGO_URI;
mongoose
  .connect(mongoUri.toString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  .then(async (result) => {
    msg = "hello";
    console.log("connected");
    await result.models.user.createIndexes({ location: "2dsphere" });
    // console.log(result.models.user);
  })
  .catch((err) => {
    console.log("ERROR WHILE CONNECTION DATABASE ");
    console.log(">>>>>>>", err);
  });
