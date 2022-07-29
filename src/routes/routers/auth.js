import express from "express";

import * as authController from "../controllers/auth.js";

import verifyToken from "../../middlewares/auth.js";

const router = express.Router();

router.post("/join", authController.authJoin);
router.post("/login", authController.authLogin);

export default router;