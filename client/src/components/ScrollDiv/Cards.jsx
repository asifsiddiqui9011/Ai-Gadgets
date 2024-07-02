import "./Cards.css";
import Cktmbtn from "../buttons/cktmbtn";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/shopContext";
import { useContext,useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

function Cards(props) {
    const {addToCart,addToWishList,allProducts,removeFromWishList} = useContext(ShopContext);
    const [iswishActive, setIsWishActive] = useState(false);
    const [iscartActive, setIsCartActive] = useState(false);

    return (
       
        <div className="CardsDiv">
         <Link to={`/product/${props.id}`} style={{textDecoration:"none", textDecorationColor:"none"}}> 
            <div  className="cardimg">
              <img src={props.image} alt="" />
            </div>
            <div className="Cardsinfo">
                <h3>{props.title}</h3>
                <p>{props.description} </p>
               
            </div>
        </Link>
            <div className="cardPrice">
                <h1>Rs.{props.price.toLocaleString('en-IN')}</h1>
                <div onClick={() => setIsWishActive(!iswishActive)}>
               {iswishActive ? <i onClick={()=>{removeFromWishList(props.id)}} className="pi pi-heart-fill" id='icons' style={{ fontSize: '2rem', }}></i> :<i onClick={()=>{addToWishList(props.id)}} className="pi pi-heart" id='icons' style={{ fontSize: '2rem' }}></i> }
                  </div>
                  <div onClick={() => setIsCartActive(!iscartActive)}>
               {iscartActive ? <Cktmbtn   title= {<FaShoppingCart className="carticon"/>} style={{width:"45px", height:"40px"}}/> :<Cktmbtn title={<i onClick={()=>{addToCart(props.id)}} className="pi pi-shopping-cart" id='icons' style={{ fontSize: '2rem' }}></i>} style={{width:"45px", height:"40px"}} /> }
                  </div>
            </div>
        </div> 
        
    )
} 

export default Cards;