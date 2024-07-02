import "./Orderitem.css"
import Cktmbtn from "./../../buttons/cktmbtn"
import {MyTimeline} from "../timeline.jsx"
import { useEffect, useState } from "react"

function Orderitem ({add,items,total,subTotal,orderDate,expectedDate,status}) {

    const [x,setx]= useState('')
    const [tems,setItems] = useState([])

    useEffect(()=>{
        if(add){
            setx(add)
            console.log(x.city)
        }
        if(items){
            setItems(items)
            console.log(tems,"tems")
        }
    })

    return (
        <div className="orderitem">

            {/* {tems? */}
            {tems.map((e,i)=>{
                console.log(e,"map")
                return   <div key={i} className="product-details">
                                <img src={e.image} alt=""  className="productimg"/>
                                <p id="ordername">{e.title}</p>
                                <p>{e.quantity}</p>
                                <p id="orderadd"> {e.description}</p>
                                <h2>Rs{e.price}</h2>
                        </div>
            })}
           <div className="totalamount">
           <p><b>Order date:- </b> {orderDate}</p>
            <p><b>Expected date:- &nbsp; </b>{expectedDate} </p>
            <p><b>Sub Total :- &nbsp; &nbsp; &nbsp;</b>{subTotal}</p>
            <p> <b>Shipping Charges:-</b>Free</p>
            <p> <b>Total Amount :-</b>{total}</p>
            <p><b>Address :-</b> {x.houseNO}{x.city} {x.locality} {x.zipCode} {}</p>
           </div>
           <MyTimeline Status={`${status}`}/>
           <Cktmbtn title={'CANCEL ORDER'} style={{width:"150px", margin:"10px 500px"}}/>
        </div>
    )
}


export default Orderitem;