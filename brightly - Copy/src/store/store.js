import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import CartSlice from "./CartSlice";
import OrderSlice from "./OrderProductsSlice";

const rootReducer = combineReducers({
  products: ProductSlice.reducer,
  cart: CartSlice.reducer,
  orders: OrderSlice.reducer,
});
export const store = configureStore({ reducer: rootReducer });
