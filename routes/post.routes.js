const { Router } = require("express");
const { createPost } = require("../controllers/post.controller");
const { mediaParser } = require("@dolphjs/core");
const { authorizeUser } = require("../middlewares/auth.middlewares");

const router = Router();

router.post(
  "/",
  authorizeUser,
  mediaParser({ fieldname: "upload", type: "single" }),
  createPost
);

module.exports = router;
