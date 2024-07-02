import "./ProductDesc.css";
import { ShopContext } from "../../context/shopContext";
import { useParams } from "react-router-dom";
import { useContext } from "react";

import Cktmbtn from "../buttons/cktmbtn";
import { FaShoppingCart } from "react-icons/fa";
import 'primeicons/primeicons.css';
import RelatedProduct from "./RelatedProduct";

import product1 from "../Assests/product1.png"
import product2 from "../Assests/product2.png"
import product3 from "../Assests/product3.png"
import Review from "./reviews/Review";

function ProductDesc(props) {
    const {allProducts, addToCart,addToWishList} = useContext(ShopContext);
    const {productId} = useParams();
    const product = allProducts.find((e)=> e.id === Number(productId));
    return (
        
        <>
        <div className="ProductDesc">
            <div className="imgreview">
                <div className="productimg">
                    <div className="productimages">
                        <img src={product.image} alt="" id="miniimg"/>
                        <img src={product1}  alt="" id="miniimg"/>
                        <img src={product2} alt="" id="miniimg" />
                        <img src={product3} alt="" id="miniimg"/>
                    </div>
                    <img src={product.image} alt="Proimg" id="largeimg" /> 
                </div>
                <div className="ProductReview">
                    <div>
                        <h2>Reviews</h2>
                        <hr />
                        <Review name={"sky walker"}/>
                        <Review name={"Eda Eldis"}/>
                        <Review name={"Zoii Rajpoot"}/>
            
                    </div>
                </div>
            </div>
            <div className="productDetails">
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <div className="productPrice">
                   <h2>RS. {product.price.toLocaleString('en-IN')}</h2>
                   <Cktmbtn title="Buy"/>
                   <Cktmbtn onClick={()=>{addToWishList(product.id)}} title={<i className="pi pi-heart" id='icons' style={{ fontSize: '2rem' }}></i>} style={{width:"45px", height:"40px"}} />
                   <Cktmbtn  onClick={()=>{addToCart(product.id)}} title= {<FaShoppingCart className="carticon"/>} style={{width:"45px", height:"40px"}}/>
                </div>
                <div className="aboutProduct">
                    <p>{product.detaildescription}</p>
                    <ul>
                        <li>Product Name-{product.title}</li>
                        <li>weight-   15Kg</li>
                        <li>version-    3.0.2.3</li>
                        <li>color-    Black</li>
                        <li>voice accessible-    Yes</li>
                        <li>wifi connectivity-   Available</li>
                        <li>automated-     Yes</li>
                    </ul>
                </div>
            </div>
        </div>
        <h2>Related Products</h2>
        <hr /><br />
        <RelatedProduct category={product.category}/>
        </>
    )
}


export default ProductDesc;