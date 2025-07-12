import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// 1️⃣ Verify token & load user onto req.user
export const verifyJWT = asyncHandler(async (req, res, next) => {
  let token = null;

  // try cookie first, then Authorization header
  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  } else if (req.header("Authorization")) {
    // fix typo “Brearer” → “Bearer ”
    token = req.header("Authorization").replace(/^Bearer\s+/i, "");
  }

  if (!token) {
    throw new ApiError(401, "Unauthorized: no token provided");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }

  // fetch the user (without sensitive fields)
  const user = await User.findById(decoded._id).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(401, "Invalid access token: user not found");
  }

  req.user = user;
  next();
});

// 2️⃣ Guard that only allows admins (acctype:true) through
export const isAdmin = (req, res, next) => {
  // we assume acctype is on the User model and indicates admin status
  if (!req.user.acctype) {
    throw new ApiError(403, "Forbidden: admin access required");
  }
  next();
};
