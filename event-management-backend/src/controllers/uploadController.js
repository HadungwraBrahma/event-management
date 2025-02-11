const cloudinary = require("../config/cloudinary");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.body.data) {
      return res.status(400).json({ message: "No image data provided" });
    }

    const result = await cloudinary.uploader.upload(req.body.data, {
      resource_type: "image",
    });

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({
      message: "Error uploading image",
      error: error.message,
    });
  }
};
