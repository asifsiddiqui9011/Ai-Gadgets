import "./Orderlist.css"
import { useState,useEffect } from "react";


function Model ({items,tog,orderDate,subTotal,total,expectedDate,address}){
  
  return(<div onClick={tog} className="order-overlay">
          
      <div  className="order-detail">
        {items.map((item,i)=>{
          return(
            <div key={i} className="order-items">
          <img src={item.image} alt="" className="item-img" />
          <p>{item.title}</p>
          <p>{item.description}</p>
          <p>{item.quantity}</p>
          <p>RS. {item.price}</p>
        </div>
          )
        })}
        <div className="order-description">
            <p><b>OrderDate: </b> {orderDate}</p>
            <p><b>Expected Date: </b> {expectedDate}</p>
            <p><b>Sub Total:</b> Rs. {subTotal}</p>
            <p><b>Total:</b> Rs. {total}</p>
            <p><b>Address: </b> {address.houseNo} {address.locality} {address.city} {address.state} {address.zipCode}</p>
        </div>
      </div>
    </div>
  )
}

function Orderlist(){
  
  const [model,setModel]= useState('')
  const handleModel=(e)=>{
    setModel(e)
  }

  const [allorders,setAllOrders] = useState([]);
  const [status,setStatus] = useState({
    id:"",
    status:"ordered"
  })

  const handlestatus = (e)=>{
    setStatus({...status,[e.target.name]:e.target.value}) 
    console.log(status,"staussusu")
  }
  const handleid = (e)=>{ 
    setStatus((prev)=>({...prev,id:e}))    
    console.log(status,"stausidd")
  }


  const fetchInfo =()=>{
    fetch('http://localhost:8080/allorders')
    .then((res)=>res.json())
    .then((data)=>{setAllOrders(data)})

  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const updatestatus = async ()=>{
    await fetch('http://localhost:8080/updateorderstatus',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(status),
    }).then((resp)=>resp.json())
      .then((data)=>{
      data.success?alert(`${status.id}  Status Updated`):alert("Failed")
    })

    await fetchInfo()
  }
    return(
        <div className="list-product">
      <h1>All Order List</h1>
      <div className="productlist-format">
        <p id="price">Order Id</p>
        <p id="title">User Id</p>
        <p id="price">Amount</p>
        <p id="price">Address</p>
        <p id="price">Order Status</p>
        <p id="price">Payment Status</p>
      </div>
      <div className="productlist-allproducts">
        <hr />
        
        {allorders.map((product,index)=>{
          let address = product.Address
          let payment = product.Payment
          let items = product.Items
          console.log(items,"items")
          

          return(
            <>
            <div key={index} className="productlist-format" onClick={()=>{handleModel(product._id)}}>
                
                <p id="title" >{product._id} </p>
                <p id="title">{product.User}</p>
                <p id="price">{product.total}</p>
                <p id="price">{address.city} {address.state} {address.zipCode}</p>
                <p id="title">{product.Status}</p>
               
                <select value={product.Status} onChange={handlestatus} onClick={()=>{handleid(product._id)}}  name='status' id="status">
                  <option value="ordered">Ordered</option>
                  <option value="shipped">Shippped</option>
                  <option value="delivered">Delivered</option>
                
                </select>
                <button onClick={updatestatus}>update</button>
                <p id="price">{product.orderDate}</p>
                <p id="price">{payment.status}</p>
            </div>
            {model===`${product._id}`?
                <Model key={product._id} items={items} tog={handleModel} orderDate={product.orderDate} expectedDate={product.expectedDate} subTotal={product.subTotal} total={product.total} address={address}/>
                :""
              }
            {/* {model &&(
      <div  key={index} className="order-overlay">
      <div className="order-detail">
        {items.map((item,i)=>{
          return(
            <div key={i} className="order-items">
          <img src={item.image} alt="" className="item-img" />
          <p>{item.title}</p>
          <p>{item.description}</p>
          <p>{item.quantity}</p>
          <p>{item.price}</p>
        </div>
          )
        })}
        <div className="order-description">
            <p><b>OrderDate: </b> {product.orderDate}</p>
            <p><b>Expected Date: </b> {product.expectedDate}</p>
            <p><b>Sub Total:</b> Rs. {product.subTotal}</p>
            <p><b>Total:</b> Rs. {product.total}</p>
            <p><b>Address: </b> {address.houseNo} {address.locality} {address.city} {address.state} {address.zipCode}</p>
        </div>
      </div>
      <button onClick={handleModel}>Close</button>
    </div>
    )
  }
             */}
          </>
            
          )
        })}

      </div>
      
    </div>
    )
}

export default Orderlist;

