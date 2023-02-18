const express = require("express");
const router = express.Router();

const multer = require("multer");
const {
  getUserDetails,
  updateUserDetails,
  deleteUser,
  getGroundUsers,
} = require("../Controler/UserControler");
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

router.get("/get", getUserDetails);
router.get("/get-ground", getGroundUsers);
router.put(
  "/update/:id",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  updateUserDetails
);
router.delete("/delete/:id", upload.none(), deleteUser);

module.exports = router;
