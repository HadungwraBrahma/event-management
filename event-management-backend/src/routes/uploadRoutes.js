const express = require("express");
const router = express.Router();
const { uploadImage } = require("../controllers/uploadController");
const auth = require("../middleware/auth");
const upload = require("../config/multer");

router.post("/", auth, upload.single("image"), uploadImage);

module.exports = router;

