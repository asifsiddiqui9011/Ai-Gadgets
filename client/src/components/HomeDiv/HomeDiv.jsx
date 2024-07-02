import { useState } from "react";
import "./HomeDiv.css"; 
import product from "../../data";
import Cards from "../ScrollDiv/Cards";
import allProducts from "../../allProducts";
import { FaShoppingCart } from "react-icons/fa";
import { MyTimeline } from "../orders/timeline";

function HomeDiv() {
    const [form, setForm] =useState({});

    const handleForm = (e) => {
        console.log(e.target.name,e.target.value);
        setForm ({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/listings',{
            method:'GET',
        })
        console.log("clicked on item button ")
        const data = await response.body
        console.log(data)
    }
    

    const [isActive, setIsActive] = useState(false);


    return (
        <div className="maindiv">
            
            <form action="" onSubmit={handleSubmit}>
                <span>Username</span>
                <input type="text" onChange={handleForm} name="Username"/>
                <span>password</span>
                <input type="text" onChange={handleForm} name="Password"/>
                <button type="submit">submit</button>
            </form>
            <div>
                <h1>Product list</h1>
                <hr />
                <MyTimeline/>
                <div>
                    {allProducts.map((item,i)=> {
                        return <Cards key={item.id} title={item.title} price={item.price}image={item.image} description={item.description}  />
                    })}
                </div>
                 
            </div>
            <div onClick={() => setIsActive(!isActive)}>
               {isActive ? <FaShoppingCart className="carticon"/> : <i className="pi pi-heart" id='icons' style={{ fontSize: '2rem' }}></i> }
            </div>
            <div className="Maindiv">
                <div className="leftContainer">
                    <h1>Decore your own home </h1>
                    <h3>Style the way of life with intelligence</h3>
                    <p>Design your own living experience by our suggestions and your choice of critical thinking</p>
                    <button>Explore</button>
                </div>
                <div className="rightContainer">
                    <img src="./home.jpg" id="rightimage" alt="" />
                </div>
            </div>
            
        </div>   
    )
}
    

export default HomeDiv;