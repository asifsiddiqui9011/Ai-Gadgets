"use client";
import HomeCatogryBtn from "../buttons/HomeCatogryBtn";
import Cards from "./Cards";
import "./CardsGrid.css";
import { useContext } from "react";
import { ShopContext } from "../../context/shopContext";


function CardsGrid(props) {
    const {allProducts} = useContext(ShopContext);
    return (
        <div className="CardsGrid">
    
            {allProducts.map((item,i)=> {
                if(props.category===item.subcategory){
                    return <Cards key={item.id} id={item.id} title={item.title} price={item.price}image={item.image} description={item.description}  />
                }
                else{
                    return null;
                }
                
                }
            )}
        </div>
    ) 
} 

export default CardsGrid;