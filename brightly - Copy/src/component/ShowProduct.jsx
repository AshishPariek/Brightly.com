import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SINGLE_ORDER } from "../store/OrderProductsSlice";
import { addToCart, removeFromCart, changeQty } from "../store/CartSlice";

const ShowProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const allProduct = useSelector((state) => state.products.products);
  const order = useSelector((state) => state.orders.orders);
  const cart = useSelector((state) => state.cart.cart);
  const index = cart.findIndex((el) => {
    return el.ProductId === id;
  });
  const [qty, setQty] = useState(1);
  const productQty = cart.map((e) => (e.ProductId === id ? e.qty : null));
  const addToCartBtn = (product) => {
    const item = { ...product, qty };
    dispatch(addToCart(item));
  };

  const removeHandler = (id) => {
    if (qty > 0) {
      if (qty == 1) {
        window.confirm("Are you sure want to remove the item from cart...?")
          ? dispatch(removeFromCart(id))
          : dispatch(changeQty({ qty: qty, id }));
      } else {
        setQty(qty - 1);
        dispatch(changeQty({ qty: qty - 1, id }));
      }
    }
  };
  const addHandler = (id) => {
    setQty(qty + 1);
    dispatch(changeQty({ qty: qty + 1, id }));
  };
  const deleteFromCart = () => {
    dispatch(removeFromCart(id));
    setQty(1);
  };
  const placeOrderHandler = (product) => {
    const orderIndex =
      order.length > 0
        ? order.map((e) => {
            return e.ProductId === product.ProductId;
          })
        : false;
    const item = { ...product, qty };
    !orderIndex
      ? dispatch(SINGLE_ORDER({ item, navigate, id: product.ProductId }))
      : alert("Already Added");
    // navigate(`/OrderProduct/${product.ProductId}`);
  };
  return (
    <div className="mainShowProductsContainer">
      {allProduct.map((product, i) => {
        if (id === product.ProductId) {
          return (
            <div key={i} className="showProductsContainer">
              <img className="showProductImg" src={product.Image}></img>
              <div key={i} className="showProductDetails">
                <h2>{product.ProductName}</h2>
                <h3>{product.Category}</h3>
                <Rating
                  readOnly
                  value={product.Rating % 5 == 0 ? 5 : product.Rating % 5}
                />
                <h3>{product.Price}</h3>
                <p>{product.Description}</p>
                <h4>A {product.Company}'s Product</h4>
                <div key={i} className="showProductsBtns">
                  <button
                    onClick={() => placeOrderHandler(product)}
                    className="addToCartBtn"
                  >
                    Place Order
                  </button>
                  {index >= 0 ? (
                    <>
                      <button
                        className="qtyBtn"
                        onClick={() => removeHandler(product.ProductId)}
                      >
                        -
                      </button>
                      <h3>{productQty}</h3>
                      <button
                        className="qtyBtn"
                        onClick={() => addHandler(product.ProductId)}
                      >
                        +
                      </button>
                      <button
                        onClick={deleteFromCart}
                        className="removeFromCartBtn"
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <button
                      className="addToCartBtn"
                      onClick={() => addToCartBtn(product)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ShowProduct;
