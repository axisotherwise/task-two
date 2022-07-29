import express from "express";

import * as commentController from "../controllers/comment.js";

import verifyToken from "../../middlewares/auth.js";

const router = express.Router();

router.post("/create/:postId", verifyToken, commentController.commentCreate);
router.get("/read/:postId", verifyToken, commentController.commentGet);
router.put("/update/:commentId", verifyToken, commentController.commentUpdate);
router.delete("/delete/:commentId", verifyToken, commentController.commentDelete);

export default router;