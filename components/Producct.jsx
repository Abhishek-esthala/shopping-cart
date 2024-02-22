import React, {useEffect, useState } from 'react'
import { Accordion, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import LoadingSpinner from './LoadingSpinner';
import { useUserContext }  from './Cart';


export default function Product() {

  const{id}=useParams();
  const[product,setproduct]=useState([]);
  const[loading,setLoading]=useState(false);

  useEffect(() => {
    const getProduct= async()=>{
      setLoading(true);
      const response= await fetch(`http://localhost:4000/products/${id}`);
      setproduct(await response.json());
      setLoading(false);
    }
  
    getProduct();
  }, [])

  const ShowProduct=()=>{
    // const {addItem}= useCart();
    const {cartItems, addToCart}=useUserContext();
    const [msg,setMsg]=useState("");

    useEffect(() => {
      const ProductExist = cartItems.find((item)=>item.id===product.id);
      if(ProductExist){

      return (setMsg(" This item already in cart."));
    } 
    },[])

   

    return(
      <> <div className="parent">    
        <div className="productImage">
        <img src={product.image} alt="" height="250px" width="220px"/>
        </div>
        <div className="productDetails">
          <h2>{product.title}</h2>
          <h6>Category : {product.category}</h6>
          <p>Description : {product.description}</p>
          <h6>Price : <s>${product.price}</s></h6>
          <h4>Dicount Price :<strong> ${(product.price-(product.price*product.discount/100)).toFixed(2)}</strong></h4>({product.discount}% off)
                 
          <h6>Rating : {product.rating && product.rating.rate} ⭐</h6>
          
          <div className="addToCartButton"><Button onClick={() => {addToCart(product);setMsg(" ✔ This item added in cart.")}}>Add to cart</Button><p><strong>{msg}</strong></p></div>
        
        </div>
        </div> 
        <div><Accordion defaultActiveKey={['0']} alwaysOpen className="accordion"><h4>Frequently asked questions and answers</h4>
      <Accordion.Item eventKey="0">
        <Accordion.Header><h5>{product.question1}</h5></Accordion.Header>
        <Accordion.Body>
        <p>{product.answer1}</p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header><h5>{product.question2}</h5></Accordion.Header>
        <Accordion.Body>
        <p>{product.answer2}</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
      </div>
      </>
    )
  }
  
  return (
    <div style={{color:"orange" , backgroundColor:"white"}}><h2>Product information</h2>
    
    <div className="row-justify-content-center">
          {loading?<LoadingSpinner/>:<ShowProduct/>}
          <div></div>
     </div>
     
     <div className='Footercss'>
      <h5> Thank you!</h5>
          <p>
             Thanks for visiting our website. We give our best to provide good content for visitors.
             Please provide your feedback in the above form. Have a nice day.          </p>
             <div className="text-center p-3">
      © 2020 Copyright: 
      <a href="https://infosys.com/"> Infosys.com</a>
        </div>    
      </div>
    </div>
  )
}
