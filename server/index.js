const port = 8080;
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const Users = require("./models/user.model")
// const Product = require("./models/products.model")
const fetchUser = require("./middleware/fetchuser.js")
const Address = require("./models/address.model.js")
const Order = require("./models/order.model.js")
const Product = require("./models/products.model.js")


app.use(express.json());
app.use(cors());


// database connection with MongoDb 
const MONGO_URL = "mongodb+srv://asifsiddiqui9011:AiGadgets1402@cluster0.sszjpbi.mongodb.net/Ai-Gadgets";
  
main()
   .then( () => {
    console.log("connected to db");
   })
   .catch((err) => {
    console.log(err);
   });

async function main(){
    await mongoose.connect(MONGO_URL);
}


//API Creation
app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

//Image Storage
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//Creating upload EndPoint for images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//adding products 
app.post('/addproduct',async (req, res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0)
    { 
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
       id=1;  
    }
    const product = new Product({
        id:id,
        title:req.body.title,
        image:req.body.image,
        image1:req.body.image,
        image2:req.body.image,
        image3:req.body.image,
        description:req.body.description,
        detaildescription:req.body.detaildescription,
        price:req.body.price,
        category:req.body.category,
        subcategory:req.body.subcategory,
        quantity:req.body.quantity,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        title:req.body.title,
    })
})

//api for adding address
app.post('/addaddress',fetchUser,async (req, res)=>{
    let addresses = await Address.find({});
    let id;
    if(addresses.length>0)
    { 
        let last_address_array = addresses.slice(-1);
        let last_address = last_address_array[0];
        id = last_address.id+1;
    }
    else{
       id=1;  

    }
    const userID = req.user.id
    console.log(userID,"addressusefriddd")
    const address = new Address({
        houseNo:req.body.houseNo,
        locality:req.body.locality,
        city:req.body.city,
        state:req.body.state,
        zipCode:req.body.zipcode,
        category:req.body.category,
        mobile:req.body.mobileno,
        user:userID,
    });
    
    console.log(address);
    await address.save();
    let objId =address.id;
    console.log(`${objId}`,userID)
    const use = await Users.findByIdAndUpdate(userID,{$push:{address:[objId]}});
    console.log(use)
    console.log("saved");
    res.json({
        success:true,
        category:req.body.category,
    })
})

//Api for Order
app.post('/orders',fetchUser, async (req, res)=>{
    let orders = await Order.find({});
    let id;
    if(orders.length>0)
    { 
        let last_order_array = orders.slice(-1);
        let last_order = last_order_array[0];
        id = last_order.id+1;
    }
    else{
       id=1;  

    }
    const userID = req.user.id
    const Mobile = req.user.mobile
    //console.log(userID,Mobile,"ordersid")
    const order = new Order({
        Items:req.body.Items,
        Address:req.body.Address,
        Payment:req.body.Payment,
        Status:req.body.Status,
        total:req.body.total,
        subTotal:req.body.subTotal,
        mobile:Mobile,
        User:userID,
    });
    
    //console.log(order);
    await order.save();
    let objId =order.id;
    //console.log(`${objId}`,userID)
    const use = await Users.findByIdAndUpdate(userID,{$push:{Order:[objId]}});
   // console.log(use)
    //console.log("saved");
    res.json({
        success:true,
        status:req.body.status,
    })
})


//API for deleting products
app.post('/removeproduct', async (req,res)=>{
    await Order.findOneAndDelete({id:req.body.id});
    // console.log("removed");
    res.json({
        success:true,
        title:req.body.title
    })
})


//get all products
app.get('/allproducts',async (req,res)=>{
    try {
        let products = await Product.find({});
        console.log(products,"all products fetched");
           res.send(products);
    } catch (error) {
        console.log(error)
    }
   
})

//get all orders 
app.get('/allorders',async (req,res)=>{
    let orders = await Order.find({});
   // console.log(orders,"all order fetched");
    res.send(orders);
})

//update order status
app.post('/updateorderstatus', async (req,res)=>{
  let orderId = req.body.id
  let status = req.body.status
  await Order.findByIdAndUpdate(orderId,{$set:{Status:status}})
  res.json({
    success:true,
    Status:req.body.status
})
})

//get address
app.get('/getAddresses', async (req,res)=>{
    let addresses = await Address.find({}).populate("Users");
    // console.log("all products fetched");
    res.send(addresses);
})

//creating endpoin signup authenticatiobn 
app.post('/signup',async(req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false,errors:'existing user found with same email address'})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
    }
    let wishlist = {};
    for (let i = 0; i < 300; i++) {
        wishlist[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        profileImage:req.body.profileImage,
        password:req.body.password,
        cartData:cart,
        wishlistData:wishlist,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
    

})

// user login endpoint
app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }

            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else {
            res.json({success:false,error:"wrong password"});
        }
    }else{
        res.json({success:false,errors:"Wrong Email Id"})
    }
})

//user google login endpoint
app.post('/googlelogin',async(req,res)=>{

    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const data = {
            user:{
                id:user.id
            }
        }
        const token = jwt.sign(data,'secret_ecom');
        console.log(user)
        return res.json({success:true,token});
    }if (!user){
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i]=0;
        }
        let wishlist = {};
        for (let i = 0; i < 300; i++) {
            wishlist[i]=0;
        }
        const newuser = new Users({
            name:req.body.name,
            email:req.body.email,
            profileImage:req.body.profileImage,
            cartData:cart,
            wishlistData:wishlist,
        })
    
        await newuser.save();
    
        const data = {
            user:{
                id:newuser.id
            }
        }
        const token = jwt.sign(data,'secret_ecom');
        res.json({success:true,token})
    }
        
    
    

})


//creating endpoint for gettig user details 
app.post('/getuserdetails',fetchUser,async (req,res)=>{
    console.log("Get user data")
    let userData =  await Users.findOne({_id:req.user.id}).populate({path:'address',model:"addresses"}).populate({path:'Order',model:"orders"});
    //console.log(userData)
    res.json(userData);
 }) 


//creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async (req,res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] +=1;
    await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
 })  

 //creating end point to remove product from cartData
 app.post('/removefromcart',fetchUser,async (req,res)=>{
  
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -=1;
    await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
 })

 //creating endpoint to get card data
 app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
 })

 //creating endpoint for adding products in wishlistdata
app.post('/addtowishlist',fetchUser,async (req,res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    userData.wishlistData[req.body.itemId] +=1;
    await Users.findByIdAndUpdate({_id:req.user.id},{wishlistData:userData.wishlistData});
    res.send("Added")
 })
 
 //creating end point to remove product from wishlistData
 app.post('/removefromwishlist',fetchUser,async (req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.wishlistData[req.body.itemId]>0)
    userData.wishlistData[req.body.itemId] =0;
    await Users.findByIdAndUpdate({_id:req.user.id},{wishlistData:userData.wishlistData});
    res.send("Removed")
 })

 //creating endpoint to get wishlist data
 app.post('/getwishlist',fetchUser,async (req,res)=>{
    console.log("GetWishList");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.wishlistData);
 })

app.listen(port,(error)=>{
    if (!error) {
        console.log("server running on port"+port)
    }
    else
    {
        console.log("error:"+error)
    }
})

