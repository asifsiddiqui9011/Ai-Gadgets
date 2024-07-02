import "./Order.css"
import Orderitem from "./orderitem/Orderitem"
import { ShopContext } from "../../context/shopContext"
import { useContext, useEffect, useState} from "react"

const Order = () => {
  const {userData} = useContext(ShopContext)
  const [order,setOrder] = useState()

  useEffect(()=>{
    if(userData.Order){
      setOrder(userData.Order)
    }
  },[userData])

  return (
    <div className="order-div">
        <h1>Track Your Orders</h1>
        <hr />
        <div className="order-desc">
          <p>picture</p>
          <p id="ordername">Name</p>
          <p>Quantity</p>
          <p id="orderadd">Description</p>
          <p>Price</p>
        </div>
        {order &&(
          order.map((e,i)=>{
            return <Orderitem key={i} add={e.Address} items={e.Items} total={e.total} subTotal={e.subTotal} orderDate={e.orderDate} expectedDate={e.expectedDate} status={e.Status}/>
          })
        )}
      
      
      <Orderitem />
    </div>
  )
}

export default Order
