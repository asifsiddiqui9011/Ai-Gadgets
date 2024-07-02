
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";


import "./footer.css";
import logo from "../Assests/new-logo.png"


function Footer() {
    return(
        <div className="footerdiv">
            <div className="details">
                <div className="logoofcmpny">
                    <img src={logo} alt="" />
                </div>
                <h3>Gadgets Engineered with Ai</h3>
                
                <div className="contactus">
                      <h3>Contact Us</h3>
                      <ul>
                        <li>Lucknow</li>
                        <li>whatsapp</li>
                        <li>Instagram</li>
                        <li>+919867954585</li>
                      </ul>
                </div>
                <div className="categories">
                    <h3>Categories</h3>
                    <ul>
                        <li>House</li>
                        <li>Office</li>
                        <li>Medical tools(soon)</li>
                    </ul>
                </div>
                <div className="aboutus">
                    <h3>About Us</h3>
                    <ul>
                        <li>Ai-gadgets</li>
                        <li>Ai-tools</li>
                        <li>Smart features</li>
                        <li>wholesale</li>
                        <li>Retail</li>
                    </ul>
                </div>
            </div>
            <div className="socialnetwork">
              <FaInstagram />
              <FaFacebook />
              <FaXTwitter />
              <FaLinkedinIn />
            </div>
        </div>
    )
} 

export default Footer;