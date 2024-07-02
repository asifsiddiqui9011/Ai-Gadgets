import "./Cart.css";
import Cartitem from "./cartitem";
import { useContext, useEffect } from "react";
import { ShopContext } from "../../context/shopContext";
import Cktmbtn from "../buttons/cktmbtn";
import Empty from "../Emptypage/Empty";
import cartbag from "../Assests/emptycart.png"
import { Link,Navigate } from "react-router-dom";
import { useState } from "react";




function Cart(){
    const {handleOrderItems,getTotalCartAmount,allProducts,cartItems,getTotalCartItems} = useContext(ShopContext)

    return(
        <div className="cartlist">
        {getTotalCartItems()===0?<Empty image={cartbag} style={{height:"600px", width:"500px"} } message={"Your Cart Is Empty Now!!!..."}/>:""}
                {allProducts.map((e)=> {
                    if(cartItems[e.id]>0){
                        return <Cartitem key={e.id} id={e.id} title={e.title} price={e.price}image={e.image} description={e.description}  />
                    }
                }
            )}
            
            <div className="checkout">
                <h2>Cart Total</h2>
                <div className="subTotal">
                    <p>Sub-Total</p>
                    <p>Rs{getTotalCartAmount().toLocaleString('en-IN')}</p>
                </div>
                <hr />
                <div className="subTotal">
                    <p>Shipping Charges</p>
                    <p>free</p>
                </div>
                <hr />
                <div className="subTotal">
                <p><b>Total</b></p>
                <p>Rs.{getTotalCartAmount().toLocaleString('en-IN')}</p>
                </div>
                {localStorage.getItem('auth-token')!==null?
                 
                 getTotalCartItems()===0?<button className="disbaled-btn" style={{height:"50px",width:"200px",fontSize:"18px"}} disabled >Proceed to CheckOut </button>:
                    <Link to="/home/cart/address" ><Cktmbtn onClick={handleOrderItems} title="Proceed to CheckOut" style={{height:"50px",width:"200px",fontSize:"18px"}}/></Link>
                

                : <Navigate to="/login"/>}  
                <br /><br /><br />
            </div>
                  
        </div>
    )
} 

export default Cart;