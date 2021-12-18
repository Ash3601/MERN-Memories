import express from "express";
import {
  getPosts,
  createPosts,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/posts.controller.js";
import { signin, signup } from "../controllers/users.controller.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
// router.get("/", getPosts);
// router.post("/", createPosts);
// // to update existing documents
// router.patch("/:id", updatePost);
// router.patch("/:id/likePost", likePost);
// router.delete("/:id", deletePost);

export default router;
