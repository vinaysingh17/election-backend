// ------------------BASE TEMPLATE-----------------------

const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.port || 5000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "80mb" }));
app.use(bodyParser.urlencoded({ limit: "80mb", extended: true }));
app.use(bodyParser.json());
app.use(express.json({ limit: "80mb" }));
app.use(express.urlencoded({ limit: "80mb" }));
var cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
require("./Middleware/Connection");

app.use(function (req, res, next) {
  console.log(req._parsedUrl.path, "----<<<<<<<<<<<Current ");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// -------------------------------------- REQUIRE ROUTES-----------------------
const AuthRoutes = require("./Routes/AuthRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const VotorRoutes = require("./Routes/VotorRoutes");
const BoothRoutes = require("./Routes/BoothRoutes");
const QuestionRoutes = require("./Routes/QuestionRoutes");
const CandidateResultRoute = require("./Routes/CandidateResultRoutes");
const AnswerRoutes = require("./Routes/AnswerRoute");
const BoothResultRoutes = require("./Routes/BoothResultRoutes");
const TimingRoutes = require("./Routes/TimingRoutes");
// const UserRoutes =require("./Routes/")

app.use("/auth", AuthRoutes);
app.use("/user", UserRoutes);
app.use("/voter", VotorRoutes);
app.use("/booth", BoothRoutes);
app.use("/question", QuestionRoutes);
app.use("/answer", AnswerRoutes);
app.use("/candidate", CandidateResultRoute);
app.use("/booth-result", BoothResultRoutes);
app.use("/timing", TimingRoutes);

// app.use("/user", UserRoutes);
// app.use("/subscription", SubscriptionRoutes);
// app.use("/coupon", CouponRoutes);
// app.use("/feedback", FeedbackRoutes);

app.listen(PORT, () => console.log(PORT));
