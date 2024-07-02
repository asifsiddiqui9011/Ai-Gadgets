import './HomeCatogryBtn.css';
import Catbtn from './catbtn';
import { IoHome } from "react-icons/io5";
import { ImOffice } from "react-icons/im";
import { Link } from 'react-router-dom';
import house from "../Assests/house.png"


function HomeCatogryBtn () {
    return(
        <>
        <img src={house} alt="home-img"  className="HomeImg"/>
        <div className="homeBtnss">
            <Link to="house/living" style={{textDecoration:"none"}}>
               <Catbtn iconn={<IoHome style={{fontSize:"60px", color:"#F7418F"}}/>} btnt={'House'}/>
        
            </Link>
            <Link to="office/conference" style={{textDecoration:"none"}}>
             <Catbtn iconn={<ImOffice style={{fontSize:"60px", color:"#F7418F"}}/>} btnt={'Office'}/>
             </Link>
        </div>
        </>
    )
}


export default HomeCatogryBtn;


// color:"#F7418F"