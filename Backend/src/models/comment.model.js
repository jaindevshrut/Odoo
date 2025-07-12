import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    content:{
        type: String,
        require:true
    },
    rating : {
        type : Number,
        require:true,
        default:0
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },

},{timestamps:true})



export const Comment = mongoose.model("Comment",commentSchema)