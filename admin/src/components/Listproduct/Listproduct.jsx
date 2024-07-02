import { useEffect, useState } from "react";
import "./Listproduct.css"


function Listproduct() {

  const [allproducts,setAllProducts] = useState([]);

  const fetchInfo =()=>{
    fetch('http://localhost:8080/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)})
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const remove_product = async (id)=>{
    await fetch('http://localhost:8080/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'content-type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="productlist-format">
        <p id="price">Product</p>
        <p id="title">Title</p>
        <p id="price">Price (Rs)</p>
        <p id="price">Category</p>
        <p id="price">Subcategory</p>
        <p id="price">Remove</p>
      </div>
      <div className="productlist-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
          return(
            <div key={index} className="productlist-format">
                <img src={product.image} alt="" className="listproduct-image"/>
                <p id="title">{product.title}</p>
                <p id="price">{product.price}</p>
                <p id="price">{product.category}</p>
                <p id="price">{product.subcategory}</p>
                <button id="remove" onClick={()=>{remove_product(product.id)}}>Remove</button>
                <button id="remove">Edit</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Listproduct;
