const mongoose = require("mongoose");

const Ratings = mongoose.model('ratings',{
    rating:{
        type:Number,
        required:true,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"Users",
        required:true,
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})

module.exports=Ratings;