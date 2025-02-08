const cloudinary = require("../config/cloudinary");

exports.uploadImage = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr);

    res.json({ url: uploadedResponse.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading image" });
  }
};
