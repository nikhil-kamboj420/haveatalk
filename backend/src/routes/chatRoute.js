import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js";
import { getStreamToken, getUserMessage } from "../controllers/chatContoller.js";

const  router = express.Router();

router.route("/token").get(protectRoute, getStreamToken)
router.route("/bot/message").post(protectRoute, getUserMessage )
export default router