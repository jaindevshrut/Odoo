// controllers/adminController.js
import mongoose from "mongoose";
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
import {Comment} from "../models/comment.model.js"

//─── USERS ──────────────────────────────────────────────────────────────────────

// GET /api/admin/users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("username email fullName createdAt")
    .sort({ createdAt: -1 })
    .lean();
  res
    .status(200)
    .json(new ApiResponse(200, users, "All users fetched successfully"));
});

// GET /api/admin/users/:id
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user = await User.findById(id)
    .select("-password -refreshToken")
    .lean();
  if (!user) throw new ApiError(404, "User not found");

  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

// PUT /api/admin/users/:id
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = (({ fullName, email, address, phone, role }) => ({
    fullName, email, address, phone, role,
  }))(req.body);

  const updated = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  })
    .select("-password -refreshToken")
    .lean();
  if (!updated) throw new ApiError(404, "User not found");

  res
    .status(200)
    .json(new ApiResponse(200, updated, "User updated successfully"));
});

// DELETE /api/admin/users/:id
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await User.findByIdAndDelete(id).lean();
  if (!deleted) throw new ApiError(404, "User not found");

  res
    .status(200)
    .json(new ApiResponse(200, deleted, "User deleted successfully"));
});

//─── ORDERS ─────────────────────────────────────────────────────────────────────

// GET /api/admin/orders
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("orderedBy", "username fullName")
    .populate("listedBy", "username fullName")
    .sort({ createdAt: -1 })
    .lean();
  res
    .status(200)
    .json(new ApiResponse(200, orders, "All orders fetched successfully"));
});

// GET /api/admin/orders/:id
export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid order ID");
  }

  const order = await Order.findById(id)
    .populate("orderedBy", "username fullName")
    .populate("listedBy", "username fullName")
    .lean();
  if (!order) throw new ApiError(404, "Order not found");

  res.status(200).json(new ApiResponse(200, order, "Order fetched successfully"));
});

// PUT /api/admin/orders/:id
export const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = (({ status }) => ({ status }))(req.body); 
  // assuming you add a `status` field to Order schema

  const updated = await Order.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  })
    .lean();
  if (!updated) throw new ApiError(404, "Order not found");

  res
    .status(200)
    .json(new ApiResponse(200, updated, "Order updated successfully"));
});

// DELETE /api/admin/orders/:id
export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Order.findByIdAndDelete(id).lean();
  if (!deleted) throw new ApiError(404, "Order not found");

  res
    .status(200)
    .json(new ApiResponse(200, deleted, "Order deleted successfully"));
});

//─── COMMENTS ──────────────────────────────────────────────────────────────────

// GET /api/admin/comments
export const getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find()
    .populate("author", "username fullName")
    .populate("onModel") // if polymorphic; otherwise whatever you need
    .sort({ createdAt: -1 })
    .lean();
  res
    .status(200)
    .json(new ApiResponse(200, comments, "All comments fetched successfully"));
});

// DELETE /api/admin/comments/:id
export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  const deleted = await Comment.findByIdAndDelete(id).lean();
  if (!deleted) throw new ApiError(404, "Comment not found");

  res
    .status(200)
    .json(new ApiResponse(200, deleted, "Comment deleted successfully"));
});
