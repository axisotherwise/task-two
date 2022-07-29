import { db } from "../../models/index.js"; 

import User from "../../models/user.js";
import Post from "../../models/post.js";
import Comment from "../../models/comment.js";

import { createJson } from "../..//middlewares/utils.js";

const postCreate = async (req, res, next) => {
  const { title, content } = req.body;
  const userId = req.userId;
  try { 
    if (title.length <= 0 && content.length <= 0) return res.status(401).json(createJson(false, "Request body not found"));
    const post = await Post.create({
      title,
      content,
      UserId: userId,
    });
    return res.status(201).json(createJson(true, "Post create success", post));
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const postRead = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [{
        model: Comment,
        attributes: ["content"],
      }, {
        model: User,
        attributes: ["name"],
      }],
    });
    if (!posts) {
      const error = new Error("Server error");
      error.status = 500;
      throw error;
    }
    return res.status(200).json(createJson(true, "Post read success", posts));
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const postReadDetail = async (req, res, next) => {
  const postId = req.params.postId;
  try { 
    if (!postId) return res.status(404).json(createJson(false, "Post number not found"));
    const post = await Post.findOne({ where: { id: postId },
      include: [{
        model: User,
        attributes: ["name"],
      }, {
        model: Comment,
        attributes: ["content"],
      }],
    }); 
    return res.status(200).json(createJson(true, "Post read success", post));
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const postUpdate = async (req, res, next) => {
  const { title, content } = req.body;
  const postId = req.params.postId;
  const userId = req.userId;
  try {
    if (!postId || !userId) return res.status(404).json(createJson(false, "postId and userId not found"));
    const post = await Post.findOne({ where: { UserId: userId }});
    if (!post) return res.status(404).json(createJson(false, "Not my post"));
    const update = await Post.update({
      title,
      content,
    }, {
      where: { id: postId },
    });
    return res.status(200).json(createJson(true, "Post update success", update));
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const postDelete = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.userId;
  try {
    if (!postId) return res.status(404).json(createJson(false, "PostId not found"));
    const post = await Post.findOne({ where: { UserId: userId }});
    if (!post) return res.status(404).json(createJson(false, "Not my post"));
    const destroy = await Post.destroy({ where: { id: postId }});
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const postLike = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.userId;
  try { 
    const post = await Post.findOne({ where: { id: postId }});
    const like = await post.addLiker(userId);
    return res.status(200).json(createJson(true, "Post like success", like));
  } catch (err) { 
    console.error(err);
    next(err);
  }
}

const postUnlike = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.userId;
  try {
    const post = await Post.findOne({ where: { id: postId }});
    const unlike = await post.removeLiker(userId);
    return res.status(200).json(createJson(true, "Post unlike success", unlike));
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const postReadLike = async (req, res, next) => {
  try {
    const result = await db.sequelize.models.Like.findAll({});
    return res.status(200).json(createJson(true, "Post read success", result));
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export {
  postCreate,
  postRead,
  postReadDetail,
  postUpdate,
  postDelete,
  postLike,
  postUnlike,
  postReadLike,
}