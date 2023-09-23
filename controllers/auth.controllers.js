const { hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { UserModel } = require("../models/user.models");
require("dotenv").config({});

const SECRET = process.env.SECRET;

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user)
      return res.status(400).json({
        msg: "a user with this email already exists, please login or try another email",
      });

    await UserModel.create({
      name,
      email,
      password: hashSync(password, 11),
    });

    res.status(201).json({ msg: "user created" });
  } catch (e) {
    res.send(e);
  }
};

const createJWT = (userId) => {
  return sign({ sub: userId, exp: 300000 }, SECRET);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "this user does not exist, try registering" });

    const isPasswordCorrect = compareSync(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ msg: "password is incorrect" });

    const jwtToken = createJWT(user._id);

    const returnUser = await UserModel.findById(user._id).select(["-password"]);

    res.status(200).json({
      user: returnUser,
      token: jwtToken,
      msg: "user logged in successfully",
    });
  } catch (e) {
    res.send(e);
  }
};

module.exports = { registerUser, loginUser };
