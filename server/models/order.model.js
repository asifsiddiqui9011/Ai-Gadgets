const mongoose = require("mongoose");

const Order = mongoose.model('orders',{
    Items:{
        type:Object,
        require:true,
    },
    Address:{
        type:Object,
        required:true,
    },
    Payment:{
        type:Object,
        required:true,
    },
    Status:{
        type:String,
        required:true,
    },
    total:{
        type:String,
        required:true,
    },
    subTotal:{
        type:String,
        required:true,
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    mobile:{
        type:String,
    },
    orderDate:{
        type:Date,
        default:Date.now,
    },
    expectedDate:{
        type:Date,
        default: () => {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 3); 
            return currentDate;
          }
    }
})
module.exports=Order;