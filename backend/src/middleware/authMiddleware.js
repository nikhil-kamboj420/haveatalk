import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    //* Check if token exists in cookies *//
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized No token provided" });
    }

    //* Verify token validity*//
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized -- Invalid token" });
    }

    //* Check if user exists in DB *//
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
     return res
       .status(401)
       .json({ message: " Unauthorized -- User not found" });
    }
// !Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};
