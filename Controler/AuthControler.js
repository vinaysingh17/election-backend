const User = require("../Schema/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("../Middleware/Validator.js");
const { generateJWt } = require("../Middleware/Authentication.js");
const {
  validateMobile,

  validateEmail,
  isValidRequestBody,
  isValid,
} = require("../Middleware/Validator.js");
const GroundUser = require("../Schema/GroundUser");

const createReferalCode = (name) => {
  let referal =
    name[0] +
    name[1] +
    name[2] +
    `${parseInt(Math.random() * 1000)}` +
    `${parseInt(Math.random() * 100)}`;
  return referal;
};

const createUser = async function (req, res) {
  try {
    let userDetails = req.body;
    console.log(req.body, "<<<<<this is body");
    if (!isValidRequestBody(userDetails)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide valid user Details" });
    }
    var isError = false;

    const validationsField = ["fullName", "mobile", "role", "password"];
    for (let index = 0; index < validationsField.length; index++) {
      if (!isValid(userDetails[validationsField[index]])) {
        isError = true;
        console.log(validationsField[index], "<<< this is item");

        res.status(400).send({
          status: false,
          message: validationsField[index] + " is required",
        });
        break;
      }
    }
    if (isError) return null;
    const checkMobile = validateMobile(userDetails.mobile, res);
    if (!checkMobile) return null;
    // const checkEmail = validateEmail(userDetails.email, res);
    // if (!checkEmail) return null;

    const validatePass = validator.validatePassWord(userDetails.password);

    if (validatePass == null) {
      return res.status(200).send({
        success: false,
        message:
          "Password must be 8-16 characters long, must have at least one uppercase, at least one lowercase, at least one digit and at least on special symbol",
      });
    }
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    userDetails.password = hashedPassword;
    if (userDetails.inviteCode) {
      userDetails.usedInviteCode = userDetails.inviteCode;
    }

    const saveUserInDb = await User.create({
      ...userDetails,
      inviteCode: createReferalCode(userDetails.fullName),
      location: {
        type: "Point",
        coordinates: [parseFloat(req.body.long), parseFloat(req.body.lat)],
      },
    });

    return res.status(201).send({
      status: true,
      message: "user created successfully!!",
      data: saveUserInDb,
    });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};
const createGround = async function (req, res) {
  try {
    let userDetails = req.body;
    console.log(req.body, "<<<<<this is body");
    if (!isValidRequestBody(userDetails)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide valid user Details" });
    }
    var isError = false;

    const validationsField = [
      "fullName",
      "mobile",
      "role",
      "password",
      "EPIC_No",
    ];
    for (let index = 0; index < validationsField.length; index++) {
      if (!isValid(userDetails[validationsField[index]])) {
        isError = true;
        console.log(validationsField[index], "<<< this is item");

        res.status(400).send({
          status: false,
          message: validationsField[index] + " is required",
        });
        break;
      }
    }
    if (isError) return null;

    const checkMobile = validateMobile(userDetails.mobile, res);
    if (!checkMobile) return null;
    // const checkEmail = validateEmail(userDetails.email, res);
    // if (!checkEmail) return null;

    const validatePass = validator.validatePassWord(userDetails.password);

    if (validatePass == null) {
      return res.status(200).send({
        success: false,
        message:
          "Password must be 8-16 characters long, must have at least one uppercase, at least one lowercase, at least one digit and at least on special symbol",
      });
    }
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    userDetails.password = hashedPassword;
    if (userDetails.inviteCode) {
      userDetails.usedInviteCode = userDetails.inviteCode;
    }

    const saveUserInDb = await GroundUser.create({
      ...userDetails,
      inviteCode: createReferalCode(userDetails.fullName),
      location: {
        type: "Point",
        coordinates: [parseFloat(req.body.long), parseFloat(req.body.lat)],
      },
    });

    return res.status(201).send({
      status: true,
      message: "user created successfully!!",
      data: saveUserInDb,
    });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

/**********************************************************User LogIn************************************************/

const userLogin = async function (req, res) {
  try {
    const loginDetails = req.body;

    const { mobile, password } = loginDetails;

    if (!validator.isValidRequestBody(loginDetails)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide login details" });
    }

    if (!validator.isValid(mobile)) {
      return res
        .status(400)
        .send({ status: false, message: "Mobile is required" });
    }

    if (!validator.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "Password is required" });
    }

    const userData = await User.findOne({ mobile });

    if (!userData) {
      return res.status(401).send({
        status: false,
        message: `Login failed!! Mobile is incorrect!`,
      });
    }

    const checkPassword = await bcrypt.compare(password, userData.password);

    if (!checkPassword)
      return res.status(401).send({
        status: false,
        message: `Login failed!! password is incorrect.`,
      });
    let userId = userData._id;

    const { fullName, _id, role } = userData;
    let sendThis = {
      fullName,
      mobile,
      _id,
      role,
    };

    return res.status(200).send({
      status: true,
      message: "LogIn Successful!!",
      data: sendThis,
    });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};
const groundLogin = async function (req, res) {
  try {
    const loginDetails = req.body;

    const { mobile, password } = loginDetails;

    if (!validator.isValidRequestBody(loginDetails)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide login details" });
    }

    if (!validator.isValid(mobile)) {
      return res
        .status(400)
        .send({ status: false, message: "mobile is required" });
    }

    if (!validator.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "Password is required" });
    }

    const userData = await GroundUser.findOne({ mobile });

    if (!userData) {
      return res.status(401).send({
        status: false,
        message: `Login failed!! mobile is incorrect!`,
      });
    }

    const checkPassword = await bcrypt.compare(password, userData.password);

    if (!checkPassword)
      return res.status(401).send({
        status: false,
        message: `Login failed!! password is incorrect.`,
      });
    let userId = userData._id;

    // const { fullName, _id, role } = userData;
    // let sendThis = {
    //   fullName,
    //   EPIC_No,
    //   _id,
    //   role,
    // };

    return res.status(200).send({
      status: true,
      message: "LogIn Successful!!",
      data: userData,
    });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

// /****************************************************************Get User Data********************************************/

const getUserDetails = async function (req, res) {
  try {
    const findUserDetails = await User.find(req.query);
    if (!findUserDetails) {
      return res
        .status(404)
        .send({ status: false, message: "User Not Found!!" });
    }

    if (findUserDetails.length == 0) {
      return res.status(200).send({
        status: false,
        message: "Data not found",
        // data: findUserDetails,
      });
    }

    return res.status(200).send({
      status: true,
      message: "Profile Fetched Successfully!!",
      data: findUserDetails,
    });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

// /************************************************************Update User Details*********************************************/

const updateUserDetails = async function (req, res) {
  try {
    let userDetails = req.body;
    let userId = req.params.userId;
    // const uploadedFile = req.files.avatar[0];
    // console.log(req.files.avatar);

    if (userDetails.password) {
      delete userDetails.password;
    }
    if (userDetails._id) {
      delete userDetails._id;
    }

    if (!validator.isValidObjectId(userId)) {
      return res.status(400).send({ status: false, message: "Invalid UserId" });
    }

    if (userDetails.emailId) {
      const checkUserEmail = await User.find({
        emailId: userDetails.emailId,
      });
      console.log(checkUserEmail);
      if (checkUserEmail.length) {
        res.status(400).send({
          message: "User already exist with this email.",
          status: false,
        });
        return null;
      }
    }

    if (req.files.avatar) {
      userDetails.avatar = req.files.avatar[0].filename;
    }

    let updateProfileDetails = await User.findOneAndUpdate(
      { _id: userId },
      userDetails,
      { new: true }
    );

    return res.status(200).send({
      status: true,
      msg: "User Update Successful!!",
      data: updateProfileDetails,
    });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  if (!validator.isValidObjectId(userId)) {
    return res.status(400).send({ status: false, message: "Invalid UserId" });
  }
  const deleteIt = await User.findByIdAndDelete(userId);
  return res.status(200).send({ message: "User successfully deleted" });
};

const forgetPass = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  try {
    res.status(200).send({
      success: true,
      body: { ...req.body },
      mesage: "Passowrd changes",
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({ success: false, message: e.message });
  }
};

module.exports = {
  createUser,
  userLogin,
  getUserDetails,
  updateUserDetails,
  deleteUser,
  groundLogin,
  forgetPass,
  createGround,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
