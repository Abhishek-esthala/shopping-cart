import { Button } from '@material-ui/core'
import React from 'react'
import { useUserContext } from '../components/Cart';

export default function CartItem() {
  const {cartItems,addToCart,decrement,removeFromCart} = useUserContext();
  const totalPrice=cartItems.reduce((price,item)=>price+item.quantity*item.price,0);
  const payablePrice=cartItems.reduce((price,item)=>price+item.quantity*(item.price-(item.price*item.discount/100)),0);
  
  

  if(cartItems.length===0) return(<div><center><h4><strong>Your cart is empty</strong></h4></center></div>)


  return (
    <>
      <div>
        <div>
          <div>
            {cartItems.map((product)=>(
              
                <div className="cartItem">
                  <div >
                    <img src={product.image}  alt="" className="cartImage" />
                  </div>
                  <div className="cartProduct">
                    <h1>{product.title}</h1>
                                        
                    <p></p>
                    <h6><strong>Discount Price : ${(product.price-(product.price*product.discount/100)).toFixed(2)}</strong> <s>${product.price}</s> ({product.discount}% off)</h6>
                    <h6>Quantity : {product.quantity}</h6>
                      
                    
                    <Button  onClick={() => decrement(product)}> - </Button>
                    <Button onClick={() => addToCart(product)}> + </Button>
                    <Button onClick={() => removeFromCart(product)}>Remove from cart</Button>
                    <div><strong>Product Quantity :{product.quantity} X Price : ${(product.price-(product.price*product.discount/100)).toFixed(2)} = ${(product.quantity*(product.price-(product.price*product.discount/100))).toFixed(2)}</strong></div>
                  </div>
                </div>
                
              
            ))}
          </div>
        </div>
      </div>
      <div className="grandTotal"><h5><strong>Total amount to be paid = ${payablePrice.toFixed(2)} only. </strong></h5>( Total $ {(totalPrice-payablePrice).toFixed(2)} saved.)</div>
    </>
  )
}
