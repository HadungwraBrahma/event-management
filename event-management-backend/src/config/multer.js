const multer = require("multer");

const storage = multer.memoryStorage();

const limits = {
  fileSize: 5 * 1024 * 1024,
};

const upload = multer({ storage, limits });

module.exports = upload;
