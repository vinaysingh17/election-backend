const VotorList = require("../Schema/VotorList");

const uploadVotorListPost = async (req, res, next) => {
  try {
    console.log(req.body);
    // return null;
    const uploadedList = await VotorList.insertMany(req.body.data, {
      ordered: true,
    });
    res.status(200).send({ success: true, message: "Data uploaded" });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};

const getVotorList = async (req, res, next) => {
  try {
    // console.log(req.body);
    // return null;
    let page = 0;
    let limit = 100;
    if (req.query.limit) limit = req.query.limit;
    if (req.query.page) page = req.query.page;
    const uploadedList = await VotorList.find()
      .skip(page * limit)
      .limit(limit);
    res.status(200).send({ success: true, data: uploadedList });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};

const getGenderFilter = async (req, res, nex) => {
  try {
    const data = await VotorList.aggregate([
      {
        $group: {
          _id: { sex: "$sex" },
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send({ success: true, message: "Data Fetched", data });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const getGenderFilterByBooth = async (req, res, nex) => {
  try {
    if (!req.query.booth) {
      return res
        .status(400)
        .send({ success: false, message: "Booth Number (booth) is required" });
    }
    const data = await VotorList.aggregate([
      {
        $match: {
          Booth_No: +req.query.booth,
        },
      },
      {
        $group: {
          _id: { sex: "$sex" },
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send({ success: true, message: "Data Fetched", data });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const ageWiseFilter = async (req, res, nex) => {
  try {
    const total = await VotorList.find().count();
    const age1819 = await VotorList.find({
      age: {
        $gte: 18,
        $lt: 19,
      },
    }).count();
    const age2029 = await VotorList.find({
      age: {
        $gte: 20,
        $lt: 29,
      },
    }).count();
    const age3039 = await VotorList.find({
      age: {
        $gte: 30,
        $lt: 39,
      },
    }).count();
    const age4049 = await VotorList.find({
      age: {
        $gte: 40,
        $lt: 49,
      },
    }).count();
    const age5059 = await VotorList.find({
      age: {
        $gte: 50,
        $lt: 59,
      },
    }).count();
    const age6069 = await VotorList.find({
      age: {
        $gte: 60,
        $lt: 69,
      },
    }).count();
    const age7079 = await VotorList.find({
      age: {
        $gte: 70,
        $lt: 79,
      },
    }).count();
    const age80 = await VotorList.find({
      age: {
        $gte: 80,
        $lt: 120,
      },
    }).count();
    res.status(200).send({
      success: true,
      message: "Data Fetched",
      data: [
        { total: total },
        { field: "18-19", value: age1819 },
        { field: "20-29", value: age2029 },
        { field: "20-29", value: age2029 },
        { field: "30-39", value: age3039 },
        { field: "40-49", value: age4049 },
        { field: "50-59", value: age5059 },
        { field: "60-69", value: age6069 },
        { field: "70-79", value: age7079 },
        { field: "80+", value: age80 },
        // { "80-89": age8089 },
      ],
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const ageWiseFilterByBooth = async (req, res, nex) => {
  try {
    if (!req.query.booth) {
      return res
        .status(400)
        .send({ success: false, message: "Booth (booth) Number is required" });
    }
    const total = await VotorList.find({
      Booth_No: +req.query.booth,
    }).count();
    const age1819 = await VotorList.find({
      Booth_No: +req.query.booth,
      age: {
        $gte: 18,
        $lt: 19,
      },
    }).count();
    const age2029 = await VotorList.find({
      Booth_No: +req.query.booth,
      age: {
        $gte: 20,
        $lt: 29,
      },
    }).count();
    const age3039 = await VotorList.find({
      Booth_No: +req.query.booth,
      age: {
        $gte: 30,
        $lt: 39,
      },
    }).count();
    const age4049 = await VotorList.find({
      Booth_No: +req.query.booth,
      age: {
        $gte: 40,
        $lt: 49,
      },
    }).count();
    const age5059 = await VotorList.find({
      Booth_No: +req.query.booth,
      age: {
        $gte: 50,
        $lt: 59,
      },
    }).count();
    const age6069 = await VotorList.find({
      Booth_No: +req.query.booth,
      age: {
        $gte: 60,
        $lt: 69,
      },
    }).count();
    const age7079 = await VotorList.find({
      Booth_No: +req.query.booth,
      age: {
        $gte: 70,
        $lt: 79,
      },
    }).count();
    const age80 = await VotorList.find({
      Booth_No: +req.query.booth,
      age: {
        $gte: 80,
        $lt: 120,
      },
    }).count();
    res.status(200).send({
      success: true,
      message: "Data Fetched",
      data: [
        { total: total },
        { field: "18-19", value: age1819 },
        { field: "20-29", value: age2029 },
        { field: "20-29", value: age2029 },
        { field: "30-39", value: age3039 },
        { field: "40-49", value: age4049 },
        { field: "50-59", value: age5059 },
        { field: "60-69", value: age6069 },
        { field: "70-79", value: age7079 },
        { field: "80+", value: age80 },
        // { "80-89": age8089 },
      ],
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = {
  uploadVotorListPost,
  getVotorList,
  getGenderFilter,
  getGenderFilterByBooth,
  ageWiseFilterByBooth,
  ageWiseFilter,
};
