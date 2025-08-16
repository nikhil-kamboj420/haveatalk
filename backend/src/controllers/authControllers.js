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
  const { fullName, email, password } = req.body;

  //* check if any field is missing  by user *//
  try {
    if (!fullName || !email || !password) {
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
      fullName,
      password,
      profilePic: randomAvatar,
    });

    // ? creating user for stream *//
    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
      console.log(`Stream user created for  ${newUser.fullName}`);
    } catch (error) {
      console.error("Error creating Steam user :", error);
    }

    //? generating JWT token and sending  it to user via cookie *//
    generateAndSendToken(newUser._id, res);

    // * finally sending response to user is created *//
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Server error" });
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
