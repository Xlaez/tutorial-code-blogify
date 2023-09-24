const { UserModel } = require("../models/user.models");
const { uploadToCloud } = require("../utils/cloudinary.utils");

const updateBio = async (req, res) => {
  try {
    const { bio } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      req.userId,
      { bio },
      { new: true }
    ).select(["_id", "bio"]);

    if (!user)
      return res.status(500).json({ msg: "user bio could not updated" });

    res.status(200).json({ msg: "bio updated successfully", user });
  } catch (e) {
    res.send(e);
  }
};

// Used to get user profile
const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select(["-password"]);
    if (!user) return res.status(404).json({ msg: "user not found" });
    res.status(200).json({ msg: "user found", user });
  } catch (e) {
    res.send(e);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId).select([
      "-password",
    ]);
    if (!user) return res.status(404).json({ msg: "user not found" });
    res.status(200).json({ msg: "user found", user });
  } catch (e) {
    res.sende(e);
  }
};

const uploadProfilePics = async (req, res) => {
  try {
    const { file } = req;
    const url = await uploadToCloud(file.path);
    const user = await UserModel.findByIdAndUpdate(
      req.userId,
      { pics: url },
      { new: true }
    ).select(["-password"]);
    if (!user) return res.status(404).json({ msg: "user not found" });
    res.status(200).json({ user, msg: "user's pics has been updated" });
  } catch (e) {
    res.send(e);
  }
};

module.exports = { updateBio, getMe, getUserById, uploadProfilePics };
