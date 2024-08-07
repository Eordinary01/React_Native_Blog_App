const Post = require("../models/postModel");

const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    //validate
    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields..",
      });
    }

    const post = await Post({
      title,
      description,
      postedBy: req.auth._id,
    }).save();
    res.status(201).send({
      success: true,
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Creating the Post..",
      error,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    res
      .status(200)
      .send({ success: true, message: "Fetched Posts Records..", posts });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Fetching the Posts..",
      error,
    });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const userPosts = await Post.find({ postedBy: req.auth._id });
    res
      .status(200)
      .send({ success: true, message: "Fetching User Posts..", userPosts });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Fetching the User Posts..",
      error,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .send({ success: true, message: "Post Deleted Sucessfully.." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error While Deleting The Posts.." });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, description } = req.body;

    const post = await Post.findById({ _id: req.params.id });

    //validate
    if (!title || !description) {
      return res
        .status(500)
        .send({
          success: false,
          message: "Please Provide Title & Decsription",
        });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );
    res
      .status(200)
      .send({
        success: true,
        message: "Post Updated Sucessfully..",
        updatedPost,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        message: "Error While Updating The Posts..",
        error,
      });
  }
};

module.exports = { createPost, getAllPosts, getUserPosts, deletePost,updatePost };
