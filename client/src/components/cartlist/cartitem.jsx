import "./cartitem.css";
import Cktmbtn from "../buttons/cktmbtn";
import { ShopContext } from "../../context/shopContext";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";


function Cartitem(props){
      const {cartItems,removeFromCart} = useContext(ShopContext)
    return(
            <div className="cartdiv">
                <div >
                     <img src={props.image} className="cartimgdiv" alt="" />
                </div>
                <div className="cartdesc">
                    <h2>{props.title}</h2>
                    <p>{props.description}</p>
                    <div className="cartprice">
                        <Cktmbtn title="Quantity "/>
                        <span><p>{cartItems[props.id]}</p></span>
                        <Cktmbtn title="Buy"/>
                        <Cktmbtn onClick={()=>{removeFromCart(props.id)}} title="Remove"/>
                        <h1>{props.price*cartItems[props.id].toLocaleString('en-IN')}</h1>
                    </div>
                </div>
        </div> 
         
    )
}

export default Cartitem;