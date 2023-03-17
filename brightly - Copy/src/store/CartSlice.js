import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (cart, action) => {
      const newCartProduct = action.payload;
      cart.cart.push(newCartProduct);
      return cart;
    },

    removeFromCart:(cart, action)=>{
      const id = action.payload
      const updatedCart = cart.cart.filter((item)=>{
        if(id!==item.ProductId){
          return item
        }
      })
      cart.cart =updatedCart
    },

    changeQty: (cart, action) => {
      const { qty, id } = action.payload;  
      cart.cart.map((e) => {
        if (e.ProductId === id) {
          e.qty = qty;
        }
      });
      return cart;
    },
  },
});
export const { addToCart, changeQty, removeFromCart } = CartSlice.actions;
export default CartSlice;
