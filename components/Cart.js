import { createContext, useContext, useState } from "react";

export const userContext = createContext({
  addToCart: () => {},
  decrement:()=>{},
  removeFromCart: () => {},
});



export function UserContextProvider({ children }) {

  const [cartItems,setCartItems]=useState([]);


    const addToCart=(product)=>{
      const ProductExist = cartItems.find((item)=>item.id===product.id);
      console.log(ProductExist);
      if(ProductExist){
        setCartItems(
          cartItems.map((item)=> item.id===product.id?{...ProductExist,quantity:ProductExist.quantity+1}:item)
        );console.log(product); 
      }else{
        setCartItems(([...cartItems,{...product,quantity:1}]))
        console.log(product.quantity)
      }
    };

    const decrement=(product)=>{
      const ProductExist = cartItems.find((item)=>item.id===product.id);
      if(ProductExist.quantity===1){
        setCartItems(cartItems.filter((item)=>item.id !==product.id));
      }else{
        setCartItems(
          cartItems.map((item)=>item.id===product.id ? {...ProductExist, quantity:ProductExist.quantity-1}:item)
        );
      }
    }
    const removeFromCart=(product)=>{
      setCartItems(cartItems.filter((item)=>item.id !==product.id));
    }
    return (
      <userContext.Provider value={{cartItems, addToCart,decrement, removeFromCart }}>
        {children}
      </userContext.Provider>
    );
  }

  export function useUserContext() {
  const {cartItems, addToCart, decrement, removeFromCart } = useContext(userContext);

  return {cartItems, addToCart,decrement, removeFromCart };
  }
