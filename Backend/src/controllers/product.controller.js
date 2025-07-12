import mongoose, {isValidObjectId} from "mongoose"
import {Product} from "../models/product.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary,deleteVideoFromCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"


export const getLatestProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ available: false })
        .sort({ createdAt: -1 }) // latest first
        .limit(5);

    if (!products.length) {
        throw new ApiError(404, "No products found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, products, "Latest products fetched successfully"));
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query = "", sortBy = "createdAt", sortType = "desc", userId } = req.query;
  const match = {
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } }
    ]
  };
  if (userId && isValidObjectId(userId)) {
    match.listedBy = mongoose.Types.ObjectId(userId);
  }

  const products = await Product.aggregate([
    { $match: match },
    { $lookup: {
        from: "users",
        localField: "listedBy",
        foreignField: "_id",
        as: "owner",
        pipeline: [{ $project: { fullName: 1, username: 1, avatar: 1 } }]
    }},
    { $addFields: { owner: { $first: "$owner" } } },
    { $project: { videoFile: 1, images: 1, title: 1, description: 1, quantity: 1, available: 1, createdAt: 1, owner: 1, size:1, category:1} },
    { $sort: { [sortBy]: sortType === "asc" ? 1 : -1 } },
    { $skip: (page - 1) * parseInt(limit, 10) },
    { $limit: parseInt(limit, 10) },
  ]);

  res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});

/**
 * POST /api/products
 */
export const addAProduct = asyncHandler(async (req, res) => {
  const { title, description, quantity = 0, category, size, condition, material, reason} = req.body;
  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  const imageFiles = req.files?.images || [];
  if (!imageFiles.length) {
    throw new ApiError(400, "At least one image is required");
  }

  const videoPath = req.files?.videoFile?.[0]?.path;
  const uploadedImages = [];

  try {
    for (const img of imageFiles) {
      const upl = await uploadOnCloudinary(img.path);
      uploadedImages.push(upl.url);
    }
  } catch (err) {
    throw new ApiError(500, "Failed to upload images");
  }

  let videoUrl;
  if (videoPath) {
    try {
      const upl = await uploadOnCloudinary(videoPath);
      videoUrl = upl.url;
    } catch {
      await Promise.all(uploadedImages.map(u => deleteFromCloudinary(u)));
      throw new ApiError(500, "Failed to upload video file");
    }
  }

  const product = await Product.create({
    title,
    description,
    quantity,
    available: false,
    images: uploadedImages,
    videoFile: videoUrl,
    listedBy: req.user._id,
    condition,
    size,
    category,
    reason,
    material
  });

  res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
});

/**
 * GET /api/products/:id
 */
export const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  // Step 1: Validate ID format
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid product ID");
  }

  // Step 2: Fetch product from DB
  const product = await Product.findById(productId).populate({
    path: "listedBy",
    select: "fullName username avatar"
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

/**
 * PUT /api/products/:id
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw new ApiError(400, "Invalid product ID");

  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, "Product not found");
  if (product.listedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to update this product");
  }

  const { title, description, quantity } = req.body;
  const newImages = req.files?.images || [];
  const videoPath = req.files?.videoFile?.[0]?.path;

  if (newImages.length) {
    await Promise.all(product.images.map(u => deleteFromCloudinary(u)));
    const urls = [];
    for (const img of newImages) {
      const upl = await uploadOnCloudinary(img.path);
      urls.push(upl.url);
    }
    product.images = urls;
  }

  if (videoPath) {
    if (product.videoFile) await deleteFromCloudinary(product.videoFile);
    const upl = await uploadOnCloudinary(videoPath);
    product.videoFile = upl.url;
  }

  if (title) product.title = title;
  if (description) product.description = description;
  if (quantity != null) product.quantity = quantity;

  await product.save();
  res.status(200).json(new ApiResponse(200, product, "Product updated successfully"));
});

/**
 * DELETE /api/products/:id
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw new ApiError(400, "Invalid product ID");

  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, "Product not found");
  if (product.listedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to delete this product");
  }

  await Promise.all(product.images.map(u => deleteFromCloudinary(u)));
  if (product.videoFile) await deleteFromCloudinary(product.videoFile);

  await Product.findByIdAndDelete(id);
  res.status(200).json(new ApiResponse(200, null, "Product deleted successfully"));
});

/**
 * PATCH /api/products/:id/availability
 */
export const toggleAvailableStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw new ApiError(400, "Invalid product ID");

  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, "Product not found");
  if (product.listedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to change availability");
  }

  product.available = !product.available;
  await product.save();
  res.status(200).json(new ApiResponse(200, product, "Availability toggled successfully"));
});


// export {
//     getAllProducts,
//     addAProduct,
//     getProductById,
//     updateProduct,
//     deleteProduct,
//     toggleAvailableStatus
// }