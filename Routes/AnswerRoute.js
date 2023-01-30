const express = require("express");
const router = express.Router();

const multer = require("multer");
const { createAnswer, getStatistic } = require("../Controler/AnswerControler");
const { createQuestion } = require("../Controler/QuestionControler");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1024,
  },
});

// router.get("/get", getUserDetails);
router.post("/create", createAnswer);
router.get("/group/:question", getStatistic);
// router.put(
//   "/update/:id",
//   upload.fields([{ name: "avatar", maxCount: 1 }]),
//   updateUserDetails
// );
// router.delete("/delete/:id", upload.none(), deleteUser);

module.exports = router;
