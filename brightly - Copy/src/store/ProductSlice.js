import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products:[]
}
const ProductSlice = createSlice({
    name:'products',
    initialState:initialState,
    reducers:{
        addProducts:(products, action)=>{
            const newProducts = action.payload
            products.products = newProducts;
            return products;
        },
    }
})
export const {addProducts} = ProductSlice.actions
export default ProductSlice;