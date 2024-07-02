
import { createContext, useEffect } from "react";
import { useState } from "react";


export const ShopContext = createContext(null);


const getDefaultCart = ()=> {
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const getDefaultWishList = ()=> {
    let wishList = {};
    for (let index = 0; index < 300+1; index++) {
        wishList[index] = 0;
    }
    return wishList;
}

 
const ShopContextProvider = (props) => {
    
    const [allProducts,setAllProducts] = useState([]);
    const [cartItems,setCartItems] = useState(getDefaultCart());
    const [wishListItems,setWishListItems] = useState(getDefaultWishList());
    const [userData,setUserData] = useState('');

    useEffect(()=>{
        fetch('http://localhost:8080/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAllProducts(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8080/getcart',{
                method:"POST",
                headers:{
                    Accept:'applocation/fporm-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            })
            .then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8080/getwishlist',{
                method:"POST",
                headers:{
                    Accept:'applocation/fporm-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:'',
            })
            .then((response)=>response.json())
            .then((data)=>setWishListItems(data));
        }

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8080/getuserdetails',{
                method:"POST",
                headers:{
                    Accept:'applocation/fporm-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:'',
            })
            .then((response)=>response.json())
            .then((data)=>setUserData(data));
        }
    },[])



    const addToWishList = (itemId) => {
        setWishListItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8080/addtowishlist',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const removeFromWishList = (itemId) => {
        setWishListItems((prev)=>({...prev,[itemId]:prev[itemId]*0}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8080/removefromwishlist',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }
    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8080/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }

    } 
    
    

    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8080/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const getTotalCartAmount = () =>  {
        let totalAmount = 0;
        for (const item in cartItems) 
        {
            if(cartItems[item]>0) {
                let itemInfo = allProducts.find((product)=> product.id ===Number(item) )
                let total = itemInfo.price 
                totalAmount += total*cartItems[item]
            } 
        }    
    return  totalAmount;
    }

    const getTotalCartItems = ()=>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const getTotalWishListItems = ()=>{
        let totalItem = 0;
        for(const item in wishListItems)
        {
            if(wishListItems[item]>0)
            {
                totalItem += wishListItems[item];
            }
        }
        return totalItem;
    }

    //Order context
    const [order,setOrder] = useState({
        Items:[],
        Address:"",
        Payment:{status:"",mode:""},
        Status:"",
        total:"",
        subTotal:""

    })
    //console.log(order,"shioo")

    const handleOrderItems = async ()=>{
        for( const items in cartItems){
            if(cartItems[items]>0)
                {
                let itemInfo = await allProducts.find((product)=> product.id ===Number(items) )
                //console.log(cartItems[items],"cartquanty")
                setOrder((prev)=>({...prev,Items:[...prev.Items,
                    {_id:`${itemInfo._id}`,
                    title:`${itemInfo.title}`,
                    image:`${itemInfo.image}`,
                    quantity:`${cartItems[items]}`,
                    price:`${cartItems[items]*itemInfo.price}`,
                    description:`${itemInfo.description}`}]}))      
                }
        }setOrder((prev)=>({...prev,total:getTotalCartAmount().toLocaleString('en-IN')}))
        setOrder((prev)=>({...prev,subTotal:getTotalCartAmount().toLocaleString('en-IN')}))
    }

    const handleOrderAddress =(e)=>{
      setOrder((prev)=>({...prev,Address:e}))   
     }
     
     const handleOrderStatus =()=>{
        setOrder({...order.Status="ordered"})
        const updatedOrder = { ...order }; // Create a copy
        updatedOrder.Payment = { status: "Paid", mode: "Credit Card" }; // Update Payment
        setOrder(updatedOrder);
           
       }




   const contextValue = {order,handleOrderStatus,handleOrderAddress,handleOrderItems,getTotalWishListItems,getTotalCartItems,getTotalCartAmount,userData,allProducts,cartItems,wishListItems,addToCart,removeFromCart,addToWishList,removeFromWishList};
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;