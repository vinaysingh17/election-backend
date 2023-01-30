const BoothResult = require("../Schema/BoothResult");
const VotorList = require("../Schema/VotorList");

const uploadBoothResult = async (req, res, next) => {
  try {
    console.log(req.body);
    // return null;
    const uploadedList = await BoothResult.insertMany(req.body.data, {
      ordered: true,
    });
    res.status(200).send({ success: true, message: "Data uploaded" });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};
const getBoothResult = async (req, res, next) => {
  try {
    // console.log(req.body);
    // return null;
    let page = 0;
    let limit = 100;
    if (req.query.limit) limit = req.query.limit;
    if (req.query.page) page = req.query.page;
    const uploadedList = await BoothResult.find()
      .skip(page * limit)
      .limit(limit);
    res.status(200).send({ success: true, data: uploadedList });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};

const geResultByBoothResult = async (req, res, next) => {
  try {
    const groupByBoothId = await BoothResult.aggregate([
      {
        $project: {
          Winner: 1,
          Booth_No: 1,
          Year: 1,
          AC_No: 1,
        },
      },
      {
        $group: {
          _id: {
            Booth_No: "$Booth_No",
            Year: "$Year",
            Winner: "$Winner",
          },
        },
      },

      {
        $sort: {
          "_id.Booth_No": 1,
        },
      },
    ]);
    res.status(200).send({
      success: true,
      message: "Done",
      data: groupByBoothId,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const getResultVoteShareBooth = async (req, res, next) => {
  try {
    if (!req.query.booth) {
      return res.status(400).send({
        success: false,
        message: "Booth Id (booth) is required",
      });
    }
    const groupByBoothId1 = await BoothResult.aggregate([
      {
        $match: {
          Booth_No: +req.query.booth,
        },
      },
      {
        $group: {
          _id: {
            Year: "$Year",
          },
          BJP: {
            $sum: "$BJP",
          },
          JDS: {
            $sum: "$JDS",
          },
          INC: {
            $sum: "$INC",
          },
        },
      },
      {
        $sort: {
          "_id.Year": 1,
        },
      },
    ]);

    res.status(200).send({
      success: true,
      message: "Done",
      data: groupByBoothId1,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const getResultVoteShare = async (req, res, next) => {
  try {
    const groupByBoothId1 = await BoothResult.aggregate([
      {
        $group: {
          _id: {
            Year: "$Year",
          },
          BJP: {
            $sum: "$BJP",
          },
          JDS: {
            $sum: "$JDS",
          },
          INC: {
            $sum: "$INC",
          },
        },
      },
      {
        $sort: {
          "_id.Year": 1,
        },
      },
    ]);

    res.status(200).send({
      success: true,
      message: "Done",
      data: groupByBoothId1,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const getResultBoothWin = async (req, res, next) => {
  try {
    const groupByBoothId1 = await BoothResult.aggregate([
      {
        $group: {
          _id: {
            Year: "$Year",
            Winner: "$Winner",
          },
          count: { $sum: 1 },
        },
      },

      {
        $sort: {
          "_id.Year": 1,
        },
      },
    ]);

    res.status(200).send({
      success: true,
      message: "Done",
      data: groupByBoothId1,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const getResultBoothWinBooth = async (req, res, next) => {
  try {
    if (!req.query.booth) {
      return res
        .status(400)
        .send({ success: false, message: "Booth Id is required" });
    }
    const groupByBoothId1 = await BoothResult.aggregate([
      {
        $match: {
          Booth_No: +req.query.booth,
        },
      },
      {
        $group: {
          _id: {
            Year: "$Year",
            Winner: "$Winner",
          },
          count: { $sum: 1 },
        },
      },

      {
        $sort: {
          "_id.Year": 1,
        },
      },
    ]);

    res.status(200).send({
      success: true,
      message: "Done",
      data: groupByBoothId1,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = {
  uploadBoothResult,
  getBoothResult,
  geResultByBoothResult,
  getResultVoteShare,
  getResultVoteShareBooth,
  getResultBoothWin,
  getResultBoothWinBooth,
};
