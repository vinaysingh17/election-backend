const CandidateResults = require("../Schema/CandidateResults");

const uploadCandidateList = async (req, res, next) => {
  try {
    console.log(req.body);
    // return null;
    const uploadedList = await CandidateResults.insertMany(req.body.data, {
      ordered: true,
    });
    res.status(200).send({ success: true, message: "Data uploaded" });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};
const getCandidateResult = async (req, res, next) => {
  try {
    // console.log(req.body);
    // return null;
    let page = 0;
    let limit = 100;
    if (req.query.limit) limit = req.query.limit;
    if (req.query.page) page = req.query.page;
    const uploadedList = await CandidateResults.find()
      .skip(page * limit)
      .limit(limit);
    res.status(200).send({ success: true, data: uploadedList });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};
const getCandidateWinnerPositionWise = async (req, res, next) => {
  try {
    if (!req.query.year) {
      return res
        .status(400)
        .send({ success: false, message: " query year is required" });
    }
    const Year = req.query.year;
    const data = await CandidateResults.find({ Year })
      .sort({ Votes: -1 })
      .limit(3);
    const totalVotes = await CandidateResults.aggregate([
      {
        $group: { _id: "$Year", sum: { $sum: "$Votes" } },
      },
    ]);
    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data,
      totalVotes,
    });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};
const getCandidateWinnerPositionWiseId = async (req, res, next) => {
  try {
    if (!req.query.year) {
      return res
        .status(400)
        .send({ success: false, message: " query year is required" });
    }
    const Year = req.query.year;
    const data = await CandidateResults.find({ Year })
      .sort({ Votes: -1 })
      .limit(3);
    const totalVotes = await CandidateResults.aggregate([
      {
        $group: { _id: "$Year", sum: { $sum: "$Votes" } },
      },
    ]);
    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data,
      totalVotes,
    });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};

module.exports = {
  uploadCandidateList,
  getCandidateResult,
  getCandidateWinnerPositionWise,
};
