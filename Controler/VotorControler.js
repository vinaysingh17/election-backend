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

const getVotorList2 = async (req, res, next) => {
  try {
    // console.log(req.body);
    // return null;
    let page = 0;
    let limit = 100;
    let options = {};

    if (req.query.limit) limit = req.query.limit;
    if (req.query.page) page = req.query.page;
    if (req.query.First_Name) {
      const { First_Name } = req.query;
      let name = First_Name.charAt(0).toUpperCase() + First_Name.slice(1);
      options = { ...options, First_Name: name };
    }
    console.log(options);
    const uploadedList = await VotorList.find(options)
      .skip(page * limit)
      .limit(limit);
    res
      .status(200)
      .send({ success: true, data: uploadedList, length: uploadedList.length });
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
    let options = [];
    if (req.query.limit) limit = req.query.limit;
    if (req.query.page) page = req.query.page;
    if (req.query.First_Name) {
      options = [
        ...options,

        {
          $search: {
            index: "default",
            text: {
              query: req.query.First_Name,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ];
    }
    if (req.query.EPIC_No) {
      options = [
        ...options,
        {
          $match: {
            EPIC_No: req.query.EPIC_No,
          },
        },
      ];
    }
    options = [
      ...options,
      {
        $match: {
          Booth_No: +req.query.Booth_No,
        },
      },
    ];

    options = [
      ...options,
      {
        $skip: page * 100,
      },
      {
        $limit: 100,
      },
    ];
    console.log(options);
    const uploadedList = await VotorList.aggregate(options);
    // const uploadedList = await VotorList.find(options)
    //   .skip(page * limit)
    //   .limit(limit);
    res
      .status(200)
      .send({ success: true, data: uploadedList, length: uploadedList.length });
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
    // const data1 = await VotorList.find({ Booth_No: 1 });

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
const getCasteWiseFilterByBooth = async (req, res, nex) => {
  try {
    if (!req.query.booth) {
      return res
        .status(400)
        .send({ success: false, message: "Booth Number (booth) is required" });
    }
    // const data1 = await VotorList.find({ Booth_No: 1 });
    const data = await VotorList.aggregate([
      {
        $match: {
          Booth_No: +req.query.booth,
        },
      },
      {
        $group: {
          _id: { Caste: "$Caste" },
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send({ success: true, message: "Data Fetched", data });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const getPartyWiseStrenthByBooth = async (req, res, nex) => {
  try {
    if (!req.query.booth) {
      return res
        .status(400)
        .send({ success: false, message: "Booth Number (booth) is required" });
    }
    // const data1 = await VotorList.find({ Booth_No: 1 });
    const data = await VotorList.aggregate([
      {
        $match: {
          Booth_No: +req.query.booth,
        },
      },
      {
        $group: {
          _id: { Voter_Favour_Party: "$Voter_Favour_Party" },
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
      },
    }).count();
    res.status(200).send({
      success: true,
      message: "Data Fetched",
      data: [
        { total: total },
        { field: "18-19", value: age1819 },
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

const FindAndUpdateByEPIC = async (req, res) => {
  if (!req.body.EPIC_No) {
    return res
      .status(400)
      .send({ success: false, message: "Epic no is required" });
  }
  if (!req.body.Voter_Mobile_Number) {
    return res
      .status(400)
      .send({ success: false, message: "Mobile no is required" });
  }
  if (!req.body.Caste) {
    return res
      .status(400)
      .send({ success: false, message: "Caste is required" });
  }
  // if (!req.body.Sub_Caste) {
  //   return res
  //     .status(400)
  //     .send({ success: false, message: "Sub_Caste is required" });
  // }
  if (!req.body.Voter_Favour_Party) {
    return res
      .status(400)
      .send({ success: false, message: "Voter_Favour_Party is required" });
  }
  if (!req.body.Is_Voter_Available_At_Election) {
    return res.status(400).send({
      success: false,
      message: "Is_Voter_Available_At_Election is required",
    });
  }

  try {
    const data = await VotorList.findOneAndUpdate(
      { EPIC_No: req.body.EPIC_No },
      {
        Voter_Mobile_Number: req.body.Voter_Mobile_Number,
        Caste: req.body.Caste,
        // Sub_Caste: req.body.Sub_Caste,
        Voter_Favour_Party: req.body.Voter_Favour_Party,
        Is_Voter_Available_At_Election: req.body.Is_Voter_Available_At_Election,
      },
      {
        new: true,
      }
    );
    res.status(200).send({ success: true, message: "Updated", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: error.message });
  }
};

const filterByCaste = async (req, res, next) => {
  try {
    const { Caste, Booth_No } = req.query;
    let page = 0;
    if (req.query.page) {
      page = req.query.page;
    }
    const data = await VotorList.find(req.query)
      .skip(page * 100)
      .limit(100);
    res.status(200).send({ success: true, data });
  } catch (error) {
    console.log(error);
  }
};
const filterByAge = async (req, res, next) => {
  try {
    const { min, max, Booth_No } = req.query;
    let page = 0;
    if (req.query.page) {
      page = req.query.page;
    }
    const data = await VotorList.find({
      Booth_No: Booth_No,
      age: { $gte: +min, $lte: +max },
    })
      .skip(page * 100)
      .limit(100);
    res.status(200).send({ success: true, data });
  } catch (error) {
    console.log(error);
  }
};
const filterByAge80 = async (req, res, next) => {
  try {
    const { min, max, Booth_No } = req.query;
    let page = 0;
    if (req.query.page) {
      page = req.query.page;
    }
    const data = await VotorList.find({
      Booth_No: req.query.Booth_No,
      age: { $gte: 80 },
    })
      .skip(page * 100)
      .limit(100);
    res.status(200).send({ success: true, data });
  } catch (error) {
    console.log(error);
  }
};
const getStatus = async (req, res, next) => {
  try {
    // const { min, max, Booth_No } = req.query;
    const total = await VotorList.countDocuments({
      Booth_No: req.query.Booth_No,
    });
    const Pending = await VotorList.countDocuments({
      Caste: null,
      Booth_No: req.query.Booth_No,
    });
    res.status(200).send({ success: true, data: { total, Pending } });
  } catch (error) {
    console.log(error);
  }
};
// const searching = async (req, res, next) => {
//   try {
//     const { min, max, Booth_No } = req.query;
//     let page = 0;
//     if (req.query.page) {
//       page = req.query.page;
//     }
//     const data = await VotorList.find({
//       age: { $gte: 80 },
//     })
//       .skip(page * 100)
//       .limit(100);
//     res.status(200).send({ success: true, data });
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  uploadVotorListPost,
  getVotorList,
  getGenderFilter,
  getGenderFilterByBooth,
  ageWiseFilterByBooth,
  ageWiseFilter,
  getCasteWiseFilterByBooth,
  getPartyWiseStrenthByBooth,
  filterByAge,
  FindAndUpdateByEPIC,
  filterByAge80,
  filterByCaste,
  getStatus,
};
