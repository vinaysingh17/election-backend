const express = require("express");
const router = express.Router();

const multer = require("multer");
const {
  uploadCandidateList,
  getCandidateResult,
  getCandidateWinnerPositionWise,
} = require("../Controler/CandidateResultControler");

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

router.post("/upload", uploadCandidateList);
router.get("/get", getCandidateResult);
router.get("/candidate-winner-position", getCandidateWinnerPositionWise);
router.get("/candidate-winner-position-id", getCandidateWinnerPositionWise);

module.exports = router;
