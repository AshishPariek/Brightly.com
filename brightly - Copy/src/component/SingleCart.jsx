import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, changeQty } from "../store/CartSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../App.css";

const SingleCart = (props) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(props.product.qty);
  const addHandler = () => {
    setQty(qty + 1);
    dispatch(changeQty({ qty: qty + 1, id: props.product.ProductId }));
  };
  const removeHandler = () => {
    if (props.product.qty > 0) {
      if (props.product.qty == 1) {
        window.confirm("Are you sure want to remove the item from cart...?")
          ? dispatch(removeFromCart(props.product.ProductId))
          : dispatch(changeQty({ qty: qty, id: props.product.ProductId }));
      } else {
        setQty(qty - 1);
        dispatch(changeQty({ qty: qty - 1, id: props.product.ProductId }));
      }
    }
  };
  const deleteFromCart = () => {
    dispatch(removeFromCart(props.product.ProductId));
  };
  return (
    <div className="cartContainer">
      <Link
        className="linkToShow"
        to={`/ShowProduct/${props.product.ProductId}`}
      >
        <img className="cartImage" src={props.product.Image}></img>
      </Link>
      <div className="cartDetailsContainer">
        <h2>{props.product.ProductName}</h2>
        <span>{props.product.Category}</span>
        <div className="cartCounter">
          <button className="cartQtyBtns" onClick={removeHandler}>
            -
          </button>
          <h3>{props.product.qty}</h3>
          <button className="cartQtyBtns" onClick={addHandler}>
            +
          </button>
          <button onClick={deleteFromCart} className="removeFromCartBtn">
            Remove
          </button>
        </div>
      </div>
      <div className="cartPriceContainer">
        <span>Price</span>
        <h3>{props.product.Price * props.product.qty}</h3>
      </div>
    </div>
  );
};

export default SingleCart;
