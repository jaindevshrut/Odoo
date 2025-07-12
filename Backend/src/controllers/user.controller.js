import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { Product } from "../models/product.model.js"
import { Order } from "../models/order.model.js"
import {deleteFromCloudinary, uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
const generateAccessAndRefreshToken = async (userId) =>{
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false}) // isme validation nahi chaiye kyuki we know what we are doing
        return {accessToken, refreshToken}
    }
    catch(error){
        throw new ApiError(500,"Something went wrong while generating tokens")
    }
}

const registerUser = asyncHandler(async (req,res)=>{
    // get the details of the user from frontend
    // validate - field is empty or not
    // check if the user already exists or not : username, email
    // check for images
    // upload to cloudinary
    // create user object - create entry in db 
    // remove password and refresh token field from response
    // check for user creation 
    // return response

    const {fullName, username, email, password, address, phone} = req.body
    if(
        [fullName, username, email, password,address, phone].some((field) => field?.trim()==="")
    )
    {
        throw new ApiError(400,"All Fields are required")
    }
    
    const existingUser = await User.findOne({
        $or :[ { username }, { email } ]
    })
    if(existingUser){
        throw new ApiError(409,"User already exists")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;

    if (!avatarLocalPath) {
 
        throw new ApiError(400, "Avatar file is required")
 
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar){
        throw new ApiError(400,"Avatar is required")
    }

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        address,
        phone
    }) 

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if (!createdUser){
        throw new ApiError(500,"Something went worng while creating a user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )
})

const loginUser = asyncHandler(async (req,res)=>{
    // check username / email
    // check the user exists or not
    // check if the password is correct or not
    // check if the refresh token match or not
    // create access and refresh token
    // send cookies
    // return response

    const { username, email, password } = req.body;
    console.log(req.body)


    if (!(username || email) && !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (!user){
        throw new ApiError(404,"User not found")
    }
    // isme ham User use nhi karege kyuki jo method hamne banayi h vo user ke liye h User hame mongodb ka mongoose se milta ha
    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if (!isPasswordCorrect){
        throw new ApiError(401,"Password is incorrect")
    }
    
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const cookieOptions = {
        httpOnly: true,
        secure: true
    } // this will to modify the cookies from the server side only (frontend se modify not possible)
    return res
    .status(200)
    .cookie("accessToken",accessToken,cookieOptions)
    .cookie("refreshToken",refreshToken,cookieOptions)
    .json(
        new ApiResponse(200,{
            user:loggedInUser,accessToken,refreshToken
        },"User logged in successfully")
    )
})


const logoutUser = asyncHandler(async (req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset : {
                refreshToken: 1 // this removes the field from the document
            }
        },
        {
            new:true
        }
    )
    const cookieOptions = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
    .clearCookie("accessToken",cookieOptions)
    .clearCookie("refreshToken",cookieOptions)
    .json(new ApiResponse(200,{},"User logged out successfully")) 
})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized Access")
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(401,"Invalid refresh token")
        }
        if(user?.refreshToken !== incomingRefreshToken){
            throw new ApiError(401,"Refresh Token Expired Or Used")
        }
        const cookieOptions = {
            httpOnly: true,
            secure: true
        }
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)
        return res
        .status(200)
        .cookie("accessToken",accessToken,cookieOptions)
        .cookie("refreshToken",newRefreshToken,cookieOptions)
        .json(new ApiResponse(200,{accessToken,refreshToken:newRefreshToken},"Token refreshed successfully"))
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid refresh token")
    }
})

const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {currentPassword, newPassword} = req.body
    if(!currentPassword || !newPassword){
        throw new ApiError(400,"Current Password and New Password is required")
    }
    const user = await User.findById(req.user._id)
    if(!user){
        throw new ApiError(404,"User not found")
    }
    const isPasswordCorrect = await user.isPasswordCorrect(currentPassword)
    if(!isPasswordCorrect){
        throw new ApiError(401,"Current Password is incorrect")
    }
    user.password = newPassword
    await user.save({validateBeforeSave:false})
    return res.status(200).json(new ApiResponse(200,{},"Password changed successfully"))
})

const getCurrentUser = asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(new ApiResponse(200,req.user,"User details fetched successfully"))

})

const updateUserDetails = asyncHandler(async(req,res)=>{
    const {fullName, username, email,address,phone} = req.body
    if([fullName, username, email].some((field) => field?.trim()==="")){
        throw new ApiError(400,"All Fields are required")
    }
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                fullName,
                username: username.toLowerCase(),
                email,
                phone,
                address
            }
        },
        {
            new:true
        }
    ).select("-password -refreshToken")
    return res
    .status(200)
    .json(new ApiResponse(200,user,"User details updated successfully"))
})

const updateUserAvatar = asyncHandler(async(req,res) => {
    const avatarLocalPath = req.file?.path; 
    if(!avatarLocalPath){
        return new ApiError(400, "Avatar file is missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar.url){
        throw new ApiError(400,"Error while uploading avatar")
    }
    const deleteResponce = await deleteFromCloudinary(req.user?.avatar)
    console.log(deleteResponce)
    const user = await User.findByIdAndUpdate(
        req.user?._id,
    {
        $set:{
            avatar: avatar.url
        }
    },
    {new:true}
    ).select("-password -refreshToken")
    return res
    .status(200)
    .json(new ApiResponse(200,user,"User details updated successfully"))
})

const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username?.trim()) {
    throw new ApiError(400, "Username is required");
  }

  const user = await User.findOne({ username: username.toLowerCase() })
    .select("username fullName email address phone avatar points createdAt")
    .lean();

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, user, "User profile fetched successfully"));
});

const getUserOrders = asyncHandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user._id);

  const orders = await Order.find({ orderedBy: userId })
    .populate({
      path: "listedBy",
      select: "username fullName avatar",
    })
    .sort({ createdAt: -1 })
    .lean();

  res
    .status(200)
    .json(new ApiResponse(200, orders, "User orders fetched successfully"));
});


const getUserListings = asyncHandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user._id);

  const listings = await Product.find({ listedBy: userId })
    .select("title category size condition available createdAt")
    .sort({ createdAt: -1 })
    .lean();

  res
    .status(200)
    .json(new ApiResponse(200, listings, "User listings fetched successfully"));
});


export {registerUser, 
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateUserDetails,
    updateUserAvatar,
    getUserProfile,
    getUserListings,
    getUserOrders
}
