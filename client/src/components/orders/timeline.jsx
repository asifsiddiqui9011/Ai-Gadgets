import './timeline.css'
import { FaBoxOpen } from "react-icons/fa";
import { RiH3, RiTruckFill } from "react-icons/ri";
import { FaTruckLoading } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { useEffect, useState } from 'react';

export function Line (props){
    return(
        <div className='line' style={props.style}>
            <div >
            <h2 className='iconofline' style={props.iconStyle}>{props.icon}</h2>
             <h2 className='tag'  style={props.tagStyle}>{props.tag}</h2>
            </div>   
        </div>
    )
}

export const MyTimeline = ({Status}) => {
  const [status,setStatus] = useState('')

  useEffect(()=>{
    setStatus(Status)
    console.log(status)
  },[status])
  return (
    <div className='horizontal-timeline'>
      <div className='events-div'>
        {status==='ordered' || status=== 'shipped' || status==='delivered' || status==='payment'? 
        <Line style={{borderRadius:"15px 0px 0px 15px",backgroundColor:"rgba(169, 19, 238, 0.903)"}} tag={"Ordered"} iconStyle={{border:"1px solid rgba(169, 19, 238, 0.9)" ,color:"rgba(169, 19, 238, 0.903)"}} tagStyle={{color:"rgba(169, 19, 238, 0.903)"}} icon={<FaBoxOpen />}/> 
        :<Line style={{borderRadius:"15px 0px 0px 15px"}}  tag={"Ordered"} icon={<FaBoxOpen />}/>}
        { status=== 'shipped' || status==='delivered'?
        <Line style={{backgroundColor:"rgba(169, 19, 238, 0.903)"}} iconStyle={{border:"1px solid rgba(169, 19, 238, 0.9)" ,color:"rgba(169, 19, 238, 0.903)"}} tagStyle={{color:"rgba(169, 19, 238, 0.903)"}} tag={"Shipped"} icon={<FaTruckLoading/>}/>:<Line  tag={"Shipped"} icon={<FaTruckLoading/>}/>}
        { status==='delivered'?
        <Line style={{backgroundColor:"rgba(169, 19, 238, 0.903)"}} iconStyle={{border:"1px solid rgba(169, 19, 238, 0.9)" ,color:"rgba(169, 19, 238, 0.903)"}} tagStyle={{color:"rgba(169, 19, 238, 0.903)"}}tag={"Delivered"} icon={<RiTruckFill/>} />:
        <Line  tag={"Delivered"} icon={<RiTruckFill/>} />}
        { status=== 'payment'?
        <Line style={{borderRadius:"0px 15px 15px 0px",backgroundColor:"rgba(169, 19, 238, 0.903)"}} iconStyle={{border:"1px solid rgba(169, 19, 238, 0.9)" ,color:"rgba(169, 19, 238, 0.903)"}} tagStyle={{color:"rgba(169, 19, 238, 0.903)"}} tag={"Payment"} icon={<RiSecurePaymentLine/>}/>:
        <Line  style={{borderRadius:"0px 15px 15px 0px"}}tag={"Payment"} icon={<RiSecurePaymentLine/>}/>}
        </div>
    </div>
  )
}
