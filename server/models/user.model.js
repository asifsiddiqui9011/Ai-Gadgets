const mongoose = require("mongoose");


//Schema for user model

const Users = mongoose.model('Users',{
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,  
    },
    cartData:{
        type:Object,
    },
    wishlistData:{
        type:Object,
    },
    profileImage:{
        type:String,
    },
    mobile:{
        type:String
    },
    address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addresses"
    }],
    ratings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ratings"
    }],
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"reviews",
    }],
    Order:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"orders",
    }],
    date:{
        type:Date,
        default:Date.now,
    }
})

module.exports=Users;