import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../store/CartSlice";
import { useSelector } from "react-redux";
import { removeFromCart } from "../store/CartSlice";
import { Rating } from "@mui/material";

const SingleProduct = (props) => {
  const cart = useSelector((state) => state.cart.cart);
  const index = cart.findIndex((element) => {
    return element.ProductId === props.product.ProductId;
  });
  const dispatch = useDispatch();
  const addToCartBtn = (product) => {
    const item = {
      ...product,
      qty: 1,
    };
    // console.log(item)
    dispatch(addToCart(item));
  };
  const deleteItem = () => {
    dispatch(removeFromCart(props.product.ProductId));
  };
  return (
    <>
      <div className="showProduct" key={props.product.ProductId}>
        <Link
          id={props.product.ProductId}
          className="linkToSingle"
          to={`/ShowProduct/${props.product.ProductId}`}
        >
          <img className="productImage" src={props.product.Image}></img>
        </Link>
        <div className="showProductDetails">
          <Link
            id={props.product.ProductId}
            className="linkToSingle"
            to={`/ShowProduct/${props.product.ProductId}`}
          >
            <h4>{props.product.ProductName}</h4>
            <span>{props.product.Category}</span>
            <br />
            <Rating
              value={
                props.product.Rating % 5 == 0 ? 5 : props.product.Rating % 5
              }
              readOnly
            />
            <h5>{props.product.Price}</h5>
            {props.product.Delivery ? (
              <>
                <span style={{ fontStyle: "italic", color: "green" }}>
                  <i className="fa-sharp fa-solid fa-truck-fast"></i>
                  Fast Delivery
                </span>
              </>
            ) : (
              <br />
            )}
          </Link>

          {index >= 0 ? (
            <button className="removeFromCartBtn" onClick={deleteItem}>
              Remove
            </button>
          ) : (
            <button
              id={props.product.ProductId}
              onClick={() => {
                addToCartBtn(props.product);
              }}
              className="addToCartBtn"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
