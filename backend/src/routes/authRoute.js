import express from "express";
import * as authControllers from "../controllers/authControllers.js";
const router = express.Router();

router.route("/signup").post(authControllers.handleSignup);
router.route("/login").post(authControllers.handleLogin);
router.route("/logout").post(authControllers.handleLogout);

export default router;