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
const getBooths = async (req, res, next) => {
  try {
    // console.log(req.body);
    // return null;
    let page = 0;
    let limit = 100;
    if (req.query.limit) limit = req.query.limit;
    if (req.query.page) page = req.query.page;
    const uploadedList = await Questions.find()
      .skip(page * limit)
      .limit(limit);
    res.status(200).send({ success: true, data: uploadedList });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};

module.exports = {
  createQuestion,
  getBooths,
};
