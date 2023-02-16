const express = require("express");
const router = express.Router();

const multer = require("multer");
const {
  createUser,
  userLogin,
  getUserDetails,
  createGround,
  groundLogin,
} = require("../Controler/AuthControler");
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

router.post("/register", upload.none(), createUser);
router.post("/register-ground", upload.none(), createGround);
router.post("/login-ground", upload.none(), groundLogin);
router.post("/login", upload.none(), userLogin);
// router.get("/get-ground", getUserDetails);
router.get("/get", getUserDetails);

module.exports = router;
