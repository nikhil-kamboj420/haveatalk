import express from "express";
import * as authControllers from "../controllers/authControllers.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/signup").post(authControllers.handleSignup);
router.route("/login").post(authControllers.handleLogin);
router.route("/logout").post(authControllers.handleLogout);
router.route("/onboarding").post(protectRoute, authControllers.handleOnboard);
// check if user is logged in
router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});
export default router;
