require("dotenv").config({});
const cloudinay = require("cloudinary");

const API_KEY = process.env.CLOUDINARY_API_KEY;
const COUD_NAME = process.env.CLOUDINARY_NAME;
const SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY;

cloudinay.v2.config({
  api_key: API_KEY,
  cloud_name: COUD_NAME,
  api_secret: SECRET_KEY,
});

const uploadToCloud = async (filepath) => {
  const { secure_url } = await cloudinay.v2.uploader.upload(filepath);
  return secure_url;
};

const deleteFromCloud = async (fileUrl) => {
  return cloudinay.v2.uploader.destroy(fileUrl);
};

module.exports = { uploadToCloud, deleteFromCloud };
