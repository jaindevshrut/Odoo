import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    orderedBy : [{
        type: mongoose.Schema.Types.ObjectId, // one who is buying
        ref: "User",
    }],
    listedBy : [{
        type: mongoose.Schema.Types.ObjectId, // one to who is listing
        ref: "User",
    }],
},{timestamps:true});

export const Order = mongoose.model("Order",orderSchema);
