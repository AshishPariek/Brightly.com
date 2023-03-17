import React from "react";
import SingleProduct from "./SingleProduct";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../store/ProductSlice";
import Filters from "./Filters";
import "../App.css";
const Products = () => {
  const dispatch = useDispatch();
  let products = useSelector((state) => state.products.products);
  const cart = useSelector((state) => state.cart.cart);
  const maximumPrice = Math.ceil(Math.max(...products.map((e) => +e.Price)));
  const [isLoading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState({
    category: null,
    rating: 1,
    price: maximumPrice > 0 ? maximumPrice : 1000,
    delivery: false,
    sortByName: "",
    sortByPrice: "",
  });

  const fetchData = async () => {
    const data = await fetch(
      "https://640864f52f01352a8a91a009.mockapi.io/api/v1/Products"
    );
    const result = await data.json();

    if (result.length > 0) {
      dispatch(addProducts(result));
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (selectedFilter.sortByName === "AtoZ") {
    products = products
      .slice()
      .sort((a, b) => (a.ProductName > b.ProductName ? 1 : -1));
  } else if (selectedFilter.sortByName === "ZtoA") {
    products = products
      .slice()
      .sort((a, b) => (a.ProductName > b.ProductName ? -1 : 1));
  } else {
    products = products;
  }
  if (selectedFilter.sortByPrice === "LowToHigh") {
    products = products.slice().sort((a, b) => a.Price - b.Price);
  } else if (selectedFilter.sortByPrice === "HighToLow") {
    products = products.slice().sort((a, b) => b.Price - a.Price);
  } else {
    products = products;
  }
  return (
    <div className="container products">
      <div className="solid">
        <div className="searchBarContainer">
          <h1 style={{ fontStyle: "italic", color: "rebeccapurple" }}>
            Brightly.com
          </h1>
        </div>
        <Link className="linkToCart" to={"/Cart"}>
          <i className="fa-solid fa-cart-shopping"></i>
          <sup className="allCartItem">{cart.length}</sup>
        </Link>
      </div>
      <div className="productDescription">
        <Filters
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        <div className="productsContainer">
          {isLoading ? (
            <h2 style={{ justifySelf: "center" }}>Loading...</h2>
          ) : (
            products.map((product, i) => {
              return (
                (selectedFilter.category
                  ? selectedFilter.category === product.Category
                  : true) &&
                (selectedFilter.rating
                  ? selectedFilter.rating <=
                    (product.Rating % 5 == 0 ? 5 : product.Rating % 5)
                  : true) &&
                (selectedFilter.price
                  ? selectedFilter.price >= product.Price
                  : true) &&
                (selectedFilter.delivery
                  ? selectedFilter.delivery === product.Delivery
                  : true) && <SingleProduct key={i} product={product} />
              );
            })
          )}
          {/* {products.map((product, i) => {
            return (
              (selectedFilter.category
                ? selectedFilter.category === product.Category
                : true) &&
              (selectedFilter.rating
                ? selectedFilter.rating <=
                  (product.Rating % 5 == 0 ? 5 : product.Rating % 5)
                : true) &&
              (selectedFilter.price
                ? selectedFilter.price >= product.Price
                : true) &&
              (selectedFilter.delivery
                ? selectedFilter.delivery === product.Delivery
                : true) && <SingleProduct key={i} product={product} />
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Products;
