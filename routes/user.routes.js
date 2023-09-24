const { Router } = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controllers");
const {
  updateBio,
  getMe,
  getUserById,
  uploadProfilePics,
} = require("../controllers/user.controllers");
const { authorizeUser } = require("../middlewares/auth.middlewares");
const { mediaParser } = require("@dolphjs/core");

const router = Router();

router.get("/me", authorizeUser, getMe);
router.get("/:userId", getUserById);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/update/bio", authorizeUser, updateBio);
router.put(
  "/update/pics",
  authorizeUser,
  mediaParser({ fieldname: "upload", type: "single" }),
  uploadProfilePics
);

module.exports = router;
