const { PostModel } = require("../models/post.model");
const { uploadToCloud } = require("../utils/cloudinary.utils");

const createPost = async (req, res) => {
  try {
    const { body, file, userId } = req;
    const url = await uploadToCloud(file.path);
    const post = await PostModel.create({ ...body, img: url, userId });
    res.status(201).json({ msg: "blog post created", post });
  } catch (e) {
    res.send(e);
  }
};

module.exports = { createPost };
