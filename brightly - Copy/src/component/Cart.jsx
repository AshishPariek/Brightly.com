import React from "react";
import { useSelector } from "react-redux";
import SingleCart from "./SingleCart";
import { Link } from "react-router-dom";
import "../App.css";

const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.cart);
  const total = cartProducts.reduce(
    (sum, item) => (sum += item.Price * item.qty),
    0
  );
  const buyItemsHandler = () => {};
  return (
    <div className="mainCartContainer">
      {cartProducts.length < 1 ? (
        <h2>Cart Is Empty</h2>
      ) : (
        cartProducts.map((item, i) => {
          return <SingleCart key={i} product={item} />;
        })
      )}
      {cartProducts.length > 0 ? (
        <>
          <h3>Total Cart Amount : {total}</h3>
          <button onClick={buyItemsHandler} className="addToCartBtn">
            Buy Items
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Cart;
