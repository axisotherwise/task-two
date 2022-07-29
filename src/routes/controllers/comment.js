import sequelize from "sequelize";

import Post from "../../models/post.js";
import Comment from "../../models/comment.js";

import { createJson } from "../../middlewares/utils.js";

const commentCreate = async (req, res, next) => {
  const userId = req.userId;
  const { postId } = req.params.postId;
  const { content } = req.body;
  try {
    const comment = await Comment.create({
      content,
      UserId: userId,
      PostId: postId,
    });
    return res.status(201).json(createJson(true, "Comment create success"));
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const commentGet = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findOne({ where: { id: postId }});
    const result = await post.getComments();
    return res.status(200).json(createJson(true, "Post read success", result));
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const commentUpdate = async (req, res, next) => {
  const userId = req.userId;
  const commentId = req.params.commentId;
  const { content } = req.body;
  try {
    const comment = await Comment.findOne({ where: { id: commentId }});
    if (userId !== comment.UserId) return res.status(404).json(createJson(false, "Not my comment"));
    const update = await Comment.update({
      content,
    }, {
      where: { id: commentId },
    });
    return res.status(200).json(createJson(true, "Comment update success", update));
  } catch (err) { 
    console.error(err);
    next(err);
  }
}

const commentDelete = async (req, res, next) => {
  const userId = req.userId;
  const commentId = req.params.commentId;
  try {
  const comment = await Comment.findOne({ where: { id: commentId }});
  if (userId !== comment.UserId) return res.status(404).json(createJson(false, "Not my comment"));
  const remove = await Comment.destroy({
    where: { id: commentId },
  });
  return res.status(200).json(createJson(true, "Comment delete success", remove));
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export {
  commentCreate,
  commentGet,
  commentUpdate,
  commentDelete,
}