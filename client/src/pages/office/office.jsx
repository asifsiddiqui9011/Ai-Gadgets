import "./office.css";
import Cktmbtn from "../../components/buttons/cktmbtn";
import { Link } from "react-router-dom";


import CardsGrid from "../../components/ScrollDiv/CardsGrid";
import Catbtn from "../../components/buttons/catbtn";
import { useState } from "react";
import { FcConferenceCall } from "react-icons/fc";
import { MdOutlineSecurity } from "react-icons/md";
import { GiDesk } from "react-icons/gi";
import { ImLab } from "react-icons/im";
import { PiToiletFill } from "react-icons/pi";

import conference from '../../components/Assests/conferenceroom.jpeg';
import desk from '../../components/Assests/desk.png';
import security from '../../components/Assests/security.png';
import washroom from '../../components/Assests/washroom.png';
import research from '../../components/Assests/Research.png'



function Office(props) {
    
    const [menu, setMenu] = useState("conference");
    console.log(menu,"menu")
    
    const [banner, setBanner] = useState(conference);
    console.log(banner,"banner")


    return (
        <>

        <div className="BtnsCards">
            <div className="category-banner">
               <img src={banner} alt="home-img"  className="HomeImg"/>
            </div>
        
            <div className="CatogryBtnDiv">
                <Link to="../home/office/conference">
                    <div onClick={ () => {setMenu("conference")}}>
                      <Catbtn onClick={ () => {setBanner(conference)}} iconn={<FcConferenceCall style={{fontSize:"60px", color:"#F7418F"}}/>} ></Catbtn>
                      {menu==="conference"?<hr id="hrbottom"/>:<></>}
                    </div>
                </Link>
                <Link to="../home/office/security">
                    <div onClick={ () => {setMenu("security")}}>
                        <Catbtn onClick={ () => {setBanner(security)}} iconn={<MdOutlineSecurity style={{fontSize:"60px", color:"#F7418F"}}/>}/>
                        {menu==="security"?<hr id="hrbottom"/>:<></>}
                    </div>
                </Link>
                <Link to="../home/office/desk">
                    <div onClick={ () => {setMenu("desk")}}>
                        <Catbtn onClick={ () => {setBanner(desk)}} iconn={<GiDesk style={{fontSize:"60px", color:"#F7418F"}}/>}/>
                        {menu==="desk"?<hr id="hrbottom"/>:<></>}
                    </div>
                </Link>
                <Link to="../home/office/research">
                    <div onClick={ () => {setMenu("research")}}>
                        <Catbtn onClick={ () => {setBanner(research)}} iconn={<ImLab style={{fontSize:"60px", color:"#F7418F"}}/>} />
                        {menu==="research"?<hr id="hrbottom"/>:<></>}
                    </div> 
                </Link>
                <Link to="../home/office/washroom">
                    <div onClick={ () => {setMenu("washroom")}}>
                        <Catbtn onClick={ () => {setBanner(washroom)}} iconn={<PiToiletFill style={{fontSize:"60px", color:"#F7418F"}}/>} />
                        {menu==="washroom"?<hr id="hrbottom"/>:<></>}
                    </div> 
                </Link>   
            </div>
            
            <CardsGrid category={props.category}/>
        </div>
        </>

    )
} 

export default Office;