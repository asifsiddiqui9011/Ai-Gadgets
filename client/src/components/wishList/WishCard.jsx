import { ShopContext } from "../../context/shopContext";
import { useContext } from "react";



import { FaShoppingCart } from "react-icons/fa";
import "./WishCard.css";
import Cktmbtn from "../buttons/cktmbtn";

function WishCard(props){
    const {removeFromWishList,addToCart} = useContext(ShopContext)
    return(
        <div className="wishcard">
            <div className="wishcardimg">
              <img src={props.image} alt="" />
            </div>
            <div className="wishCradsinfo">
                <div className="description">
                  <h3>{props.title}</h3>
                  <p >{props.description} </p>
                </div>
                <div className="wishcardPrice">
                    <h1>Rs.{props.price.toLocaleString('en-IN')}</h1>
                    <Cktmbtn onClick={()=>{removeFromWishList(props.id)}} title="Remove"/>
                    {/* <i className="pi pi-shopping-cart" id='icons' style={{ fontSize: '2rem' }}></i> */}
                    <Cktmbtn  onClick={()=>{addToCart(props.id)}} title= {<FaShoppingCart className="carticon"/>} style={{width:"45px", height:"40px"}}/>
                </div>
            </div>
        </div>
    )
}

export default WishCard;