const express = require("express");
const router = express.Router();

const multer = require("multer");
const { uploadBooths, getBooths } = require("../Controler/BoothControler");
const {
  uploadBoothResult,
  getBoothResult,
  geResultByBoothResult,
  getResultVoteShare,
  getResultBoothWin,
  getResultVoteShareBooth,
  getResultBoothWinBooth,
} = require("../Controler/BoothResultControler");
const {
  getUserDetails,
  updateUserDetails,
  deleteUser,
} = require("../Controler/UserControler");
const {
  uploadVotorListPost,
  getVotorList,
} = require("../Controler/VotorControler");
const VotorList = require("../Schema/VotorList");

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

router.post("/upload", uploadBoothResult);
router.get("/get", getBoothResult);
router.get("/assembly-data", geResultByBoothResult);
router.get("/assembly-data", geResultByBoothResult);
router.get("/party-wise-vote-share", getResultVoteShare);
router.get("/party-wise-vote-share-id", getResultVoteShareBooth);
router.get("/party-wise-booth-win", getResultBoothWin);
router.get("/party-wise-booth-win-id", getResultBoothWinBooth);

// router.put(
//   "/update/:id",
//   upload.fields([{ name: "avatar", maxCount: 1 }]),
//   updateUserDetails
// );
router.delete("/delete/:id", upload.none(), deleteUser);

module.exports = router;
