import "./catbtn.css";
import { GiSofa} from "react-icons/gi";
import { GiBathtub } from "react-icons/gi";

function Catbtn(props) {
    return (
        <>
        <div className='homebtndivv' onClick={props.onClick}>
            <div className="HomeCtBtn" >
                {props.iconn}
                <p style={{margin:"0",textDecoration:"none"}}>{props.btnt}</p>
            </div>
        </div>
        </>
    )
}

export default Catbtn;