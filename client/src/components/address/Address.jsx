import Cktmbtn from "../buttons/cktmbtn"
import "./Address.css"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { ShopContext } from "../../context/shopContext"
import { FaBackspace } from "react-icons/fa"
import { Link, Navigate } from "react-router-dom"
  
const Address = () => {
  const {userData,handleOrderAddress} = useContext(ShopContext)
  const oldaddress = userData.address

  const [address,setAddress] = useState({
    category:"house",
		houseNo:"",
		locality:"",
		city:"",
		state:"",
    zipcode:"",
    mobileno:""
	}) 

  const changeHandler = (e)=>{
    setAddress({...address,[e.target.name]:e.target.value})  
  }
  const Add_Address = async ()=>{
    await fetch('http://localhost:8080/addaddress',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(address),
    }).then((resp)=>resp.json())
      .then((data)=>{
      data.success?alert("Address Added"):alert("Failed")
    })
   }
const [shippingAdd,setShippingAdd] = useState()

const handleship = (e)=>{
  setShippingAdd(e)

}
const AddAddress = ()=>{
  handleOrderAddress(shippingAdd)
}

  return (
    <div className="addressDiv">
      <div className="inputdiv">
        <h3>Choose Shipping Address</h3>
        <div className="previousAdds">
          {oldaddress.map((addrs, index) =>{
            return (
              
                <div onClick={()=>{handleship(addrs)}} className="prevAdd"  key={index}>
                    <h4>{addrs.category}</h4>
                   <p> {addrs.houseNo}{addrs.locality}  {addrs.city}   {addrs.state} - {addrs.zipCode}</p>
                </div>
            )
          })
          }
        </div>
        <Link to={"/home/cart/address/payment"}><Cktmbtn onClick={AddAddress}  title={"Shipp Here" } style={{width:"200px", height:"40px", fontSize:"18px"}}/></Link>
      </div>
      <div className="inputdiv">
         <div className="inputdetails">
          <p>Address Location Category:</p>
          <select value={address.category} onChange={changeHandler} name="category" id="add-product-selector">
              <option value="house">House</option>
              <option value="office">Office</option>
          </select>
        </div> 
        <div className="inputdetails">
          {address.category==="house"?<p>House No.</p>:<p>Company Name:</p>}
          <input type="text" value={address.houseNo} onChange={changeHandler} name="houseNo" placeholder="" />
        </div>
        <div className="inputdetails">
          <p>Locality:</p>
          <input type="text" value={address.locality} onChange={changeHandler}  name="locality" placeholder="" />
        </div>
        <div className="inputdetails">
          <p>City:</p>
          <input type="text" value={address.city} onChange={changeHandler} name="city" placeholder="" />
        </div>
        <div className="inputdetails">
          <p>State:</p>
          <input type="text" value={address.state} onChange={changeHandler} name="state" placeholder="" />
        </div>
        <div className="inputdetails">
          <p>Zip Code:</p>
          <input type="text" value={address.zipcode} onChange={changeHandler} name="zipcode" placeholder="" />
        </div>
        <div className="inputdetails">
        <p>Mobile No: </p>
          <input type="text" value={address.mobileno} onChange={changeHandler} name="mobileno" placeholder="" />

        </div>
        <Cktmbtn onClick={Add_Address} title={"Add New Address"} style={{width:"200px", height:"38px", fontSize:"18px"}}/>
      </div>
  
    </div>
  )
}

export default Address
