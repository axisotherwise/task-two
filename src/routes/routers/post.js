import express from "express";

import * as postController from "../controllers/post.js";

import verifyToken from "../../middlewares/auth.js";

const router = express.Router();

router.post("/create", verifyToken, postController.postCreate);
router.get("/read", postController.postRead);
router.get("/read/like", postController.postReadLike);
router.get("/read/:postId", postController.postReadDetail);
router.put("/update/:postId", verifyToken, postController.postUpdate);
router.delete("/delete/:postId", verifyToken, postController.postDelete);
router.put("/like/:postId", verifyToken, postController.postLike);
router.delete("/like/:postId", verifyToken, postController.postUnlike);

export default router;