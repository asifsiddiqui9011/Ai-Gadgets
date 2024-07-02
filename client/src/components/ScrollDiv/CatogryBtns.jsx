import "./CatogryBtns.css";
import Cktmbtn  from "../buttons/cktmbtn";
import { Link } from "react-router-dom";

import { IoBed } from "react-icons/io5";
import { FaKitchenSet } from "react-icons/fa6";
import { GiBathtub } from "react-icons/gi";
import { GiSofa } from "react-icons/gi";
import CardsGrid from "./CardsGrid"
import Catbtn from "../buttons/catbtn";
import { useState } from "react";

//banners
import living from '../../components/Assests/Living-Area.jpeg';
import kitchen from '../Assests/kitchen101.png'
import bathroom from '../../components/Assests/bathroom.png'
import bedroom from '../../components/Assests/Bedroom.png'



function CatogryBtns(props) {
    
    const [menu, setMenu] = useState("living");
    console.log(menu,"menu")
    
    const [banner, setBanner] = useState(living);
    console.log(banner,"banner")


    return (
        <>

        <div className="BtnsCards">
            <div className="category-banner">
               <img src={banner} alt="home-img"  className="HomeImg"/>
            </div>
        
            <div className="CatogryBtnDiv">
                <Link to="../home/house/living">
                    <div onClick={ () => {setMenu("living")}}>
                      <Catbtn onClick={ () => {setBanner(living)}} iconn={<GiSofa style={{fontSize:"60px", color:"#F7418F"}}/>} ></Catbtn>
                      {menu==="living"?<hr id="hrbottom"/>:<></>}
                    </div>
                </Link>
                <Link to="../home/house/kitchen">
                    <div onClick={ () => {setMenu("kitchen")}}>
                        <Catbtn onClick={ () => {setBanner(kitchen)}} iconn={<FaKitchenSet style={{fontSize:"60px", color:"#F7418F"}}/>}/>
                        {menu==="kitchen"?<hr id="hrbottom"/>:<></>}
                    </div>
                </Link>
                <Link to="../home/house/bedroom">
                    <div onClick={ () => {setMenu("bedroom")}}>
                        <Catbtn onClick={ () => {setBanner(bedroom)}} iconn={<IoBed style={{fontSize:"60px", color:"#F7418F"}}/>}/>
                        {menu==="bedroom"?<hr id="hrbottom"/>:<></>}
                    </div>
                </Link>
                <Link to="../home/house/bathroom">
                    <div onClick={ () => {setMenu("bathroom")}}>
                        <Catbtn onClick={ () => {setBanner(bathroom)}} iconn={<GiBathtub style={{fontSize:"60px", color:"#F7418F"}}/>} />
                        {menu==="bathroom"?<hr id="hrbottom"/>:<></>}
                    </div> 
                </Link>   
            </div>
            
            <CardsGrid category={props.category}/>
        </div>
        </>

    )
} 

export default CatogryBtns;