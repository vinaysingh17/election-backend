const { default: mongoose } = require("mongoose");
const Answers = require("../Schema/Answers");
const Answer = require("../Schema/Answers");
const VotorList = require("../Schema/VotorList");

const createBulAnswer = async (req, res) => {
  const uploadedList = await Answer.insertMany(req.body.data, {
    ordered: true,
  });
  res
    .status(200)
    .send({ success: true, data: uploadedList, message: "Data uploaded" });
};
const createAnswer = async (req, res, next) => {
  try {
    console.log(req.body);
    // return null;
    // const uploadedList = await Questions.insertMany(req.body.data, {
    //   ordered: true,
    // });

    const upload = await Answer.create(req.body);
    res
      .status(200)
      .send({ success: true, data: upload, message: "Data uploaded" });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
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
  createAnswer,
  createBulAnswer,
  getStatistic,
  dailySurvey,
};
