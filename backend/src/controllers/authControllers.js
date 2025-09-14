import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateAndSendToken = (userid, res) => {
  // * generating token for user *//
  const token = jwt.sign(
    {
      userId: `${userid}`,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );

  // * sending JWT token  to the user's browser in cookie  *//
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

// ! handleSignup function  *//
export const handleSignup = async (req, res) => {
  const { userName, email, password } = req.body;

  //* check if any field is missing  by user *//
  try {
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // * check  if the password  is greater than 6 *//
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // * check is there is  any emailRegex is missing by  user *//
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // * check  if  the user Full name  is already exist in the database *//
    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res
        .status(400)
        .json({ message: "User Name is already taken,try different!" });
    }
    // * check  if  the user is already exist in the database *//
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exist,try different!" });
    }

    // * generating random avatar for user  *//
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    // * creating new user || seting user data  into database  *//
    const newUser = await User.create({
      email,
      userName,
      password,
      profilePic: randomAvatar,
    });

    // ? creating user for stream *//
    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.userName,
        image: newUser.profilePic || "",
      });
      console.log(`Stream user created for  ${newUser.userName}`);
    } catch (error) {
      console.error("Error creating Steam user :", error);
    }

    //? generating JWT token and sending  it to user via cookie *//
    generateAndSendToken(newUser._id, res);

    // * finally sending response to user is created *//
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Server error"});
  }
};

// ! handleLogin function  *//
export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //? generating JWT token and sending  it to user via cookie *//
    generateAndSendToken(user._id, res);

    // * finally sending response to user is  successfully logedIn*//
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ! handleLogout function  *//
export const handleLogout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

//!  handleOnboard function *//
export const handleOnboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const { userName, bio, nativeLanguage, learningLanguage, location } =
      req.body;

    //*check if user fill all fields or not *//
    if (
      !userName ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      !location
    ) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !userName && "userName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }

    // *update user details in database*//
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
  // ! update user details in stream*//
    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.userName,
        image: updatedUser.profilePic || "",
      });
      console.log(
        `stream user updated after onboarding for ${updatedUser.userName}`
      );
    } catch (streamError) {
      console.log(
        "Error updating stream user during onboarding",
        streamError.message
      );
    }
    // *send onboarded user details to client*//
    res.status(200).json({
      success: true,
      message: "Onboarded successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log("Error in onboard controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
