import { useState } from "react";
import "./Addproduct.css"
import imageselect from "../../assets/imageselector.jpg"

function Addproduct() {

    const [image,setImage] = useState(false);
    const [image1,setImage1] = useState(false);
    const [image2,setImage2] = useState(false);
    const [image3,setImage3] = useState(false);
    const [productDetails,setProductDetails] = useState({
        title:"",
        description:"",
        price:'',
        image:"",
        image1:"",
        image2:"",
        image3:"",
        category:"house",
        subcategory:"living",
        quantity:''
    })

  

  console.log(image,"image")

  const imageHandler = (e)=>{
        setImage(e.target.files[0]);
    }

  const image1Handler = (e)=>{
      setImage1(e.target.files[0]);
  }

  const image2Handler = (e)=>{
    setImage2(e.target.files[0]);
}

  const image3Handler = (e)=>{
  setImage3(e.target.files[0]);
}

    const changeHandler = (e)=>{
      setProductDetails({...productDetails,[e.target.name]:e.target.value})  
    }

    const Add_Product = async ()=>{
        console.log(productDetails);
        let responseData=[''];
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image);
        
  
      
        
        await fetch('http://localhost:8080/upload',{
          method:'POST',
          headers:{
            Accept:'application/json',
          },
        body:formData,
        }).then((resp)=> resp.json()).then((data)=>{responseData=data})
          
        if(responseData.success)
        {
  
          product.image = responseData.image_url;
      
          // console.log(product);
          await fetch('http://localhost:8080/addproduct',{
          method:'POST',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
          },
          body:JSON.stringify(product),
        }).then((resp)=>resp.json())
          .then((data)=>{
          data.success?alert("Product Added"):alert("Failed")
        })
      }
    }

    

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title:</p>

        <input value={productDetails.title} onChange={changeHandler} type="text" name="title" placeholder="Type Product title" />
        <p>Product Description:</p>
        <input value={productDetails.description} onChange={changeHandler}type="text" name="description" placeholder="Type Product description" />
      </div>
      <div className="addproduct-itemfield">
        <p>Price:</p>
        <input value={productDetails.price} onChange={changeHandler} type="text" name="price" placeholder="Type here" />
        <p>Quantity:</p>
        <input value={productDetails.quantity} onChange={changeHandler} type="text" name="quantity" placeholder="Type here" />
      </div>
      <div className="addproduct-itemfield">
         <p>Product Category:</p>
         <select value={productDetails.category} onChange={changeHandler} name="category" id="add-product-selector">
            <option value="house">House</option>
            <option value="office">Office</option>
        </select>
        {console.log(productDetails.category,"product category")}
        <p>Product SubCategory:</p>
         {
          productDetails.category==="house"?
         <select value={productDetails.subcategory} onChange={changeHandler}name="subcategory" id="add-product-selector">
            <option value="living">living</option>
            <option value="kitchen">kitchen</option>
            <option value="bedroom">bedroom</option>
            <option value="bathroom">bathroom</option>
        </select>
           :
        <select value={productDetails.subcategory} onChange={changeHandler}name="subcategory" id="add-product-selector">
            <option value="conference">conference</option>
            <option value="security">security</option>
            <option value="research">research</option>
            <option value="desk">desk</option>
            <option value="washroom">washroom</option>
        </select>
        }
      </div>
      <div>
        <span>
         <p>Detail Description:</p>
          <textarea onChange={changeHandler} value={productDetails.detaildescription} name="detaildescription" id="text-area" cols="100" rows="5"></textarea>
        </span>
      </div>
      <h2>Select Images</h2>
      <hr />
      <div className="addproduct-itemfield">

        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):imageselect} alt="input img" className="input-image"/>   
        </label>
        <input onChange= {imageHandler} type="file" name="image" id="file-input" hidden/>
        <label htmlFor="file-input1">
            <img src={image1?URL.createObjectURL(image1):imageselect} alt="input img1" className="input-image"/>   
    
       </label>
        <input onChange= {image1Handler} type="file" name="image" id="file-input1" hidden/>
        <label htmlFor="file-input2">
            <img src={image2?URL.createObjectURL(image2):imageselect} alt="input img2" className="input-image"/>   
        </label>
        <input onChange= {image2Handler} type="file" name="image" id="file-input2" hidden/>
        <label htmlFor="file-input3">
            <img src={image3?URL.createObjectURL(image3):imageselect} alt="input img3" className="input-image"/>   
        </label>
        <input onChange= {image3Handler} type="file" name="image" id="file-input3" hidden/>
      </div>
      <button onClick={()=>{Add_Product()}}className="addproduct-btn">ADD</button>
    </div>
  )
}
export default Addproduct;
