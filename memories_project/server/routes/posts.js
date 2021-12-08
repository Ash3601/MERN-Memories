import express from "express";
import {
  getPosts,
  createPosts,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/posts.controller.js";
const router = express.Router();

router.get("/", getPosts);
router.post("/", createPosts);
// to update existing documents
router.patch("/:id", updatePost);
router.patch("/:id/likePost", likePost);
router.delete("/:id", deletePost);
export default router;
