import "./Navbar.css";
import navlogo from "../../assets/adminlogo.png"
import profile from "../../assets/profile.jpg"
function Navbar() {
  return (
    <div className="navbar">
      <img src={navlogo} alt="" className="nav-logo" />
        <img src={profile} alt="nav profile" className="navprofile"/>
    </div>
  )
}

export default Navbar
