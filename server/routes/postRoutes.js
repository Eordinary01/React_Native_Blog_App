const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  createPost,
  getAllPosts,
  getUserPosts,
  deletePost,
  updatePost,
} = require("../controllers/postController");

const router = express.Router();

//create post
router.post("/create-post", requireSignIn, createPost);
// get all post
router.get("/get-all-post", getAllPosts);
// get user post
router.get("/get-user-post", requireSignIn, getUserPosts);
// delete post
router.delete("/delete-post/:id", requireSignIn, deletePost);
// update post
router.put("/update-post/:id", requireSignIn, updatePost);

module.exports = router;
