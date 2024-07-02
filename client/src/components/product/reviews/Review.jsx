import "./Review.css"
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import reviewimg from "../../Assests/profile1.jpg"

function Review (props) {
  return (
    <div className="reviewbox">
        <div className="reviewuser">
            <img src={reviewimg} alt="" id="reviewimg"/>
            <h3 id="nameofreviewer">{props.name}</h3>
        </div>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem consequatur natus.</p>
      <p id="reviewstar"><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar /> <FaStar/></p>
    </div>
  )
}

export default Review
