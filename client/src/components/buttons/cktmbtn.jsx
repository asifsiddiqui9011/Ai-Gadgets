import './buttons.css'
import 'primeicons/primeicons.css';

function Cktmbtn(props){
    return (
        <button disabled={props.disabled} onClick={props.onClick} style={props.style}  className="btn">{props.title} </button>
    )
};


export default Cktmbtn;