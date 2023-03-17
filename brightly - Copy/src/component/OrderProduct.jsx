import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ADD_QTY, EMPTY_ORDER } from "../store/OrderProductsSlice";

const OrderProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  console.log(orders.length);

  const buyAgainHandler = () => {
    dispatch(ADD_QTY(id));
  };
  // useEffect(() => {
  //   return () => {
  //     dispatch(EMPTY_ORDER(id));
  //     console.log("ttdttctct", orders);
  //   };
  // }, []);
  return (
    <div className="orderDetailContainer">
      <h1 style={{ color: "green" }}>You Have Purched : </h1>
      {orders.map((item) => {
        if (id === item.ProductId) {
          return (
            <div className="orderDetail">
              <h2>Product : {item.ProductName}</h2>
              <h3>Price : {item.Price}</h3>
              <span>Quantity : {item.qty}</span>
              <h2>Total Spend : {item.Price * item.qty}</h2>
              <button className="addToCartBtn" onClick={buyAgainHandler}>
                Buy Again
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default OrderProduct;
