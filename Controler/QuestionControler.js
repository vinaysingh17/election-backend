const Questions = require("../Schema/Question");
const VotorList = require("../Schema/VotorList");

const createQuestion = async (req, res, next) => {
  try {
    console.log(req.body);
    // return null;
    // const uploadedList = await Questions.insertMany(req.body.data, {
    //   ordered: true,
    // });

    const upload = await Questions.create(req.body);
    res
      .status(200)
      .send({ success: true, data: upload, message: "Data uploaded" });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};
const getQuestions = async (req, res, next) => {
  try {
    // console.log(req.body);
    // return null;

    const uploadedList = await Questions.find();

    res.status(200).send({ success: true, data: uploadedList });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};

module.exports = {
  createQuestion,
  getQuestions,
};
