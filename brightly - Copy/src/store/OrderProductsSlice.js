import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const OrderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    SINGLE_ORDER: (order, action, navigate, id) => {
      const ordered = action.payload;
      order.orders.push(ordered);
      navigate(`/OrderProduct/${id}`);
    },
    CART_ORDER: (order, action) => {},
    ADD_QTY: (order, action) => {
      const id = action.payload;
      order.orders.map((item) => {
        if (+item.ProductId === +id) {
          item.qty += 1;
        }
      });
    },
    EMPTY_ORDER: (order, action) => {
      order.orders = [];
    },
  },
});

export const { SINGLE_ORDER, ADD_QTY, CART_ORDER, EMPTY_ORDER } =
  OrderSlice.actions;
export default OrderSlice;
