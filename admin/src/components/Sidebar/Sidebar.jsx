import { Link } from "react-router-dom"
import "./Sidebar.css"
import addproduct from "../../assets/add-product.png"
import list from "../../assets/checklist.png"
import orderlist from "../../assets/shopping-cart.png"

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to={'/addproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={addproduct} alt="addd product icon"  />
            <p>Add Product</p>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
            <img src={list} alt="list product icon" />
            <p> Product List</p>
        </div>
      </Link>
      <Link to={'/orderlist'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
            <img src={orderlist} alt="order list icon" />
            <p> Order List</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
