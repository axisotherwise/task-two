import jwt from "jsonwebtoken";

import { createJson } from "./utils.js";

export default async (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  try {
    if (!token) return res.status(404).json(createJson(false, "Invalid token")); 
    const decodedToken = jwt.verify(token, "tasktwo");
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") return res.status(404).json(createJson(false, "Token expired"));
    return res.status(404).json(createJson(false, "Invalid token"));
  }
}

