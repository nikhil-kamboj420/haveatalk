import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";
//?===========defining getRecommendedUsers func()=============  *//
export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;
    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // exclude current user
        { _id: { $nin: currentUser.friends } }, // exclude current user's friends
        { isOnboarded: true }, // only onboarded users
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log(" Error in getRecommendedUsers  controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//? ===========defining getMyFriends func()=============  *//
export const getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );
    res.status(200).json(user.friends);
  } catch (error) {
    console.log(" Error in getMyFriends  controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//? ===========defining sendFriendRequest func()=============  *//
export const sendFriendRequest = async (req, res) => {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;
    // *  prevent sending req to yourself  *//
    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You can't send a friend request to yourself" });
    }
    // *  check if recipient is exist in db  *//

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "User not found" });
    }
    // *  check if recipient is already in my friends list  *//
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({ message: "You are already friends" });
    }

    // *  check if a req  already exists  *//
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myld, recipient: recipientId },
        { sender: recipientId, recipient: myld },
      ],
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: " Friend request already exists" });
    }

    // *  create a new friend request  *//
    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(200).json({
      success: true,
      message: "Friend request sent successfully",
      friendRequest,
    });
  } catch (error) {
    console.log(" Error in sendFriendRequest  controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//? ===========defining acceptFriendRequest func()=============  *//
export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await friendRequest.findById(requestId);

    // *  check if friend request exists  *//
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }
    // *  check if friend request is for me  *//
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not autorized to accept this request" });
    }

    // *  accept friend request  *//
    friendRequest.status = "accepted";
    await friendRequest.save();

    // *add each user to the other's friends array *//
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });
    // *  return success message  *//
    res
      .status(200)
      .json({ success: true, message: "Friend request accepted successfully" });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//? ===========defining getFriendRequest func()=============  *//
export const getFriendRequest = async (req, res) => {
  try {
    // *  get all friend requests for the current user  *//
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );
    // *  get all friend requests sent by the current user  *//
    const acceptedReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic ");

    // *  return friend requests  *//
    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//? ===========defining getOutgoingFriendReqs func()=============  *//

export const getOutgoingFriendReqs = async (req, res) => {
  try {
    // *  get all friend requests sent by the current user  *//
    const outgoingReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );
    // *  return friend requests  *//
    res.status(200).json(outgoingReqs);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//? ===========defining rejectFriendRequest func()=============  *//
export const rejectFriendRequest = async (req, res) => {
  try {
    const friendReqId = req.params.id;
    const friendReq = await FriendRequest.findById(friendReqId);
    if (!friendReq) {
      return res.status(404).json({ message: "Friend request not found" });
    }
    friendReq.status = "rejected";
    await friendReq.save();
    res.status(200).json({ success: true, message: "Friend request rejected" }); 
  } catch (error) {
    console.error("Error in rejectFriendRequest controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
