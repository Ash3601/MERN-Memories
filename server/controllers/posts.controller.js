import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.json(postMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPosts = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params; // Note: id is renamed to _id
  const Post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    // check if the id is of type of mongoose or not
    res.status(404).send("No post with that id");
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, Post, {
    new: true,
  });

  res.json(updatedPost);
};

export const likePost = async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    // check if the id is of type of mongoose or not
    res.status(404).send("No post with that id");
  }
  try {
    const post = await PostMessage.findById(_id);
    console.log("Post is ", post);
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { likeCount: post.likeCount + 1 },
      { new: true },
    );
    console.log("Sending the updated post to the client", updatedPost);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log("Server Error: Like Post", error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      // check if the id is of type of mongoose or not
      res.status(404).send("No post with that id");
    }
    await PostMessage.findByIdAndRemove(postId);
    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    console.log("Server Error: Delete Post", error);
  }
};
