import express from "express";
import {
  getPosts,
  createPosts,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/posts.controller.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPosts);
// to update existing documents
router.patch("/:id", auth, updatePost);
router.patch("/:id/likePost", auth, likePost);
router.delete("/:id", auth, deletePost);
export default router;
