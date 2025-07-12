import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; // bahut sare data ko page wise divide karne ke liye
const productSchema = new mongoose.Schema({
    videoFile : {
        type : String,
    },
    images : {
        type : [String],
        required : true,
    },
    title : {
        type : String,
        required: true
    },
    listedBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description : {
        type : String,
        required : true,
    },
    price:{
        type : Number,
        default : 0,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    size : {
        type : String,
        required : true
    },
    material : {
        type : String,
        default: "N/A"
    },
    reason : {
        type : String,
        default: "N/A"
    },
    condition : {
        type : String,
        required : true
    },
    available : {
        type : Boolean,
        default : true
    },
    status:{
        type: Number,
        default: 0  // 0 - > listed, 1 -> need approval, 2-> success
    }
},{timestamps: true});


productSchema.plugin(mongooseAggregatePaginate) // this is used to paginate the data (kaha se kaha tak data de rha h)
export const Product = mongoose.model('Product', productSchema);