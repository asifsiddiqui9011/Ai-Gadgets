import React from "react";
import "./RelatedProduct.css";



import Cards from "../ScrollDiv/Cards";
import { useContext } from "react";
import { ShopContext } from "../../context/shopContext";


function RelatedProduct(props) {
    const {allProducts} = useContext(ShopContext);
    return (
        <div className="CardsGrid">
            {allProducts.map((item,i)=> {
                if(props.category===item.category){
                    return <div key={i} onClick={window.scrollTo(0,0)}><Cards key={item.id} id={item.id} title={item.title} price={item.price}image={item.image} description={item.description}  />
                           </div>
                }
                else{
                    return null;
                }
                
                }
            )}
        </div>
    )
} 

export default RelatedProduct;