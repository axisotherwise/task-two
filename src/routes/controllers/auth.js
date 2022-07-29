import jwt from "jsonwebtoken";

import User from "../../models/user.js";

import { createJson } from "../../middlewares/utils.js";

const authJoin = async (req, res, next) => {
  const { name, password, passwordConfirm } = req.body;
  try {
    if (!name || !password || password === passwordConfirm) return res.status(404).json(createJson(false, "Request body not found"));
    const exist = await User.findOne({ where: { name }});
    if (exist) return res.status(404).json(createJson(false, "Already create user"));
    const user = await User.create({
      name,
      password,
    });
    return res.status(201).json(createJson(true, "User create success", user));
  } catch (err) {
    console.error(err);
    return next(err);
  }
}

const authLogin = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ where: { name }});
    if (!user && user.password !== password) return res.status(404).json(createJson(false, "Password is not match"))
    const token = jwt.sign(
      {
        userId: user.id,
        userName: user.name,
      },
      "tasktwo",
      {
        expiresIn: "1h",
      },
    );
    return res.status(200).json(createJson(true, "Login success", token));
  } catch (err) {
    console.error(err);
    return next(err);
  }
}

export {
  authJoin,
  authLogin,
}