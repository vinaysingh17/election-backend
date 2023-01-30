const BoothList = require("../Schema/BoothList");
const VotorList = require("../Schema/VotorList");

const uploadBooths = async (req, res, next) => {
  try {
    console.log(req.body);
    // return null;
    const uploadedList = await BoothList.insertMany(req.body.data, {
      ordered: true,
    });
    res.status(200).send({ success: true, message: "Data uploaded" });
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
    const uploadedList = await BoothList.find()
      .skip(page * limit)
      .limit(limit);
    res.status(200).send({ success: true, data: uploadedList });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};

module.exports = {
  uploadBooths,
  getBooths,
};
