const { default: mongoose } = require("mongoose");
const Answers = require("../Schema/Answers");
const Answer = require("../Schema/Answers");
const Timing = require("../Schema/Timing");
const VotorList = require("../Schema/VotorList");

const createBulAnswer = async (req, res) => {
  const uploadedList = await Answer.insertMany(req.body.data, {
    ordered: true,
  });
  res
    .status(200)
    .send({ success: true, data: uploadedList, message: "Data uploaded" });
};
const createLogin = async (req, res, next) => {
  try {
    console.log(req.body);
    const upload = await Timing.create(req.body);
    res
      .status(200)
      .send({ success: true, data: upload, message: "Data uploaded" });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};
const updateLogout = async (req, res) => {
  try {
    const { surveyBy, logout, date } = req.body;
    const data = await Timing.findOneAndUpdate(
      { surveyBy, date },
      { logout },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
  }
};

const getTimings = async (req, res) => {
  const { surveyBy } = req.params;
  if (!surveyBy)
    return res
      .status(400)
      .send({ success: false, message: "surveyBy is required" });
  const data = await Timing.find({ surveyBy });
  res.status(200).send({ success: true, message: "get all", data });
};

const getStatistic = async (req, res, next) => {
  try {
    // console.log(req.body);
    // return null;
    const { question } = req.params;
    console.log(question, "<< this is question");
    if (!question) {
      return res
        .status(400)
        .send({ success: false, message: "Question (question) is required" });
    }
    const groupByBoothId1 = await Answers.aggregate([
      {
        $match: {
          question: mongoose.Types.ObjectId(question),
        },
      },
      {
        $group: {
          _id: {
            question: "$question",
            answer: "$answer",
          },
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send({ success: true, data: groupByBoothId1 });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};
const dailySurvey = async (req, res, next) => {
  try {
    // console.log(req.body);
    // return null;
    const { surveyBy } = req.params;
    console.log(surveyBy, "<< this is question");
    if (!surveyBy) {
      return res
        .status(400)
        .send({ success: false, message: "surveyBy (surveyBy) is required" });
    }
    const groupByBoothId1 = await Answers.aggregate([
      {
        $match: {
          surveyBy: mongoose.Types.ObjectId(surveyBy),
        },
      },
      {
        $group: {
          _id: {
            date: "$date",
          },
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send({ success: true, data: groupByBoothId1 });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};

module.exports = {
  updateLogout,
  createLogin,
  createBulAnswer,
  getStatistic,
  getTimings,
  dailySurvey,
};
