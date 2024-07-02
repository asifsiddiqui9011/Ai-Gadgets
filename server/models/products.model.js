const mongoose = require("mongoose");

//Schema for creating products

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    image1:{
        type:String,
        required:true,
    },
    image2:{
        type:String,
        required:true,
    },
    image3:{
        type:String,
        required:true,
    },
    
    description:{
        type:String,
        required:true,
    },
    detaildescription:{
        type:String,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    subcategory:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    date:{
       type:Date,
       default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})

module.exports=Product;