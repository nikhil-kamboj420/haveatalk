import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js";
import { getStreamToken } from "../controllers/chatContoller.js";

const  router = express.Router();

router.route("/token").get(protectRoute, getStreamToken)
export default router