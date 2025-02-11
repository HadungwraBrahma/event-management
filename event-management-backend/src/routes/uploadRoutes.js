const express = require("express");
const router = express.Router();
const { uploadImage } = require("../controllers/uploadController");
const auth = require("../middleware/auth");

router.post("/", auth, uploadImage);

module.exports = router;
