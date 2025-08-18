import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {
  getRecommendedUsers,
  getMyFriends,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequest,
  getOutgoingFriendReqs,
} from "../controllers/userController.js";

const router = express.Router();
// ?apply auth middleware to all routes
router.use(protectRoute);
// ?get recommended users
router.route("/").get(getRecommendedUsers);
// ?get my friends
router.route("/friends").get(getMyFriends);
// ?send friend request
router.route("/friend-request/:id").post(sendFriendRequest);
// ?accept friend request
router.route("/friends-request/:id/accept").put(acceptFriendRequest);
// ?reject friend request
router.route("/friends-request/:id/reject").put(rejectFriendRequest);
// ?get friend request
router.route("/friend-requests").get(getFriendRequest);
// ?get outgoing friend requests
router.route("/outgoing-friend-requests").get(getOutgoingFriendReqs);

export default router;
