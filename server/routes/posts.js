import express from "express";

import {
  getPostsBySearch,
  getPosts,
  getPostsByCreator,
  getPost,
  createPosts,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/creators", getPostsByCreator);
router.get("/:id", getPost);
router.get("/", getPosts);
router.post("/", auth, createPosts);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;

/* 
1-ADD Route  [server/routes/posts]
2-ADD Controller  [server/controllers/posts]

3-ADD API call  [client/api/index]
4-ADD Action  [client/actions/posts]
5-ADD Reducer  [client/reducers/posts]
6-ADD Component  [client/comonents/post]
*/
