const express = require("express");
const router = express.Router();

const multer = require("multer");
const {
  getUserDetails,
  updateUserDetails,
  deleteUser,
} = require("../Controler/UserControler");
const {
  uploadVotorListPost,
  getVotorList,
  getGenderFilter,
  ageWiseFilter,
  getGenderFilterByBooth,
  ageWiseFilterByBooth,
  getCasteWiseFilterByBooth,
  getPartyWiseStrenthByBooth,
  FindAndUpdateByEPIC,
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

router.post("/upload", uploadVotorListPost);
router.get("/get", getVotorList);
router.patch("/update-by-epic-no", FindAndUpdateByEPIC);
router.get("/gender-filter", getGenderFilter);
router.get("/gender-filter-id", getGenderFilterByBooth);
router.get("/caste-group-id", getCasteWiseFilterByBooth);
router.get("/party-group-id", getPartyWiseStrenthByBooth);
router.get("/age-group", ageWiseFilter);
router.get("/age-group-id", ageWiseFilterByBooth);
// router.get("/age-group-id", ageWiseFilterByBooth);
// router.delete("/delete/:id", upload.none(), deleteUser);

module.exports = router;
