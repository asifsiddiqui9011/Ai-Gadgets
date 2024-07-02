import { useContext } from "react"
import Cktmbtn from "../buttons/cktmbtn"
import "./Payment.css"
import {  Link, } from "react-router-dom"
import { ShopContext } from "../../context/shopContext"

const Payment = () => {
  const{handleOrderStatus,order,} = useContext(ShopContext)

  const PlaceOrder = async ()=>{
    // console.log(order,"order")
    await fetch('http://localhost:8080/orders',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(order),
    }).then((resp)=>resp.json())
      .then((data)=>{
      data.success?alert("Order Placed"):alert("Failed")
    })

   }
  return (
    <div className='paydiv'>
      <input type="radio" onClick={handleOrderStatus} ></input>
      <h2>Cash on Delivery</h2>
      <h2>Pay using UPI</h2>
      <h2>Pay Using Net Banking</h2>
      <h2>Pay using Card</h2>
      <Link to={"/../../home/UserProfile"}><Cktmbtn onClick={PlaceOrder} title="Place Order"/></Link>
    </div>
  )
}

export default Payment
