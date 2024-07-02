import "./UserProfile.css";
import Cktmbtn from "../buttons/cktmbtn.jsx";
// import jwt  from "jsonwebtoken";
// import { jwtDecode } from 'jwt-decode' 
import { ShopContext } from "../../context/shopContext.jsx";
import { useContext, useEffect, useState } from "react";
import profile from "../Assests/profile1.jpg"


function UserProfile(){
    
    const {userData} = useContext(ShopContext)
    const [address,setAddress] = useState([])

    useEffect(()=>{
        if(userData.address){
            setAddress(userData.address[0])
        }
    },[userData])
    
    return (
        <div className="Userdiv">
            <div className="profileimg">
                <img src={userData.profileImage} alt="" />
                <h2>{userData.name}</h2>
                {console.log(userData,"userprofiledata")}
            </div>
            <div className="userdetails">
                <div className="align-details">
                <h2>Email:</h2>
               <p>{userData.email}</p> 
                </div>
                <div className="align-details">
                   <h2>mobile no:</h2>
                   {address &&(
                     <p>+91{address.mobile}</p>
                   )}
                  
                </div>
                <div className="align-details">
                <h2><b>Address:</b></h2>
                { address &&(
                    <p>{address.houseNo}{address.locality}  {address.city}   {address.state} - {address.zipCode}</p>
                )}
                </div>
                
            </div>
            <div className="profilebtns">
               <Cktmbtn title="Edit"/>
               <Cktmbtn title="Sing Out"/>
            </div>

        </div>
    )
} 

export default UserProfile;