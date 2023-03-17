import React from "react";
import { useSelector } from "react-redux";
import { Slider, Rating } from "@mui/material";
import Box from "@mui/material/Box";

const Filters = (props) => {
  const allProducts = useSelector((state) => state.products.products);
  const category = allProducts.map((e) => e.Category);
  const uniqueCategory = [...new Set(category)];
  const selectedFilter = props.selectedFilter;
  const setSelectedFilter = props.setSelectedFilter;
  const maximumPrice = Math.ceil(Math.max(...allProducts.map((e) => +e.Price)));

  const seletedCategory = (e) => {
    setSelectedFilter((prev) => ({ ...prev, category: e.target.value }));
  };

  const ratingHandler = (e) => {
    setSelectedFilter((prev) => ({ ...prev, rating: +e.target.value }));
  };

  const priceHandler = (e) => {
    setSelectedFilter((prev) => ({ ...prev, price: +e.target.value }));
  };

  const deliveryHandler = (e) => {
    setSelectedFilter((prev) => ({ ...prev, delivery: e.target.checked }));
  };

  const sortByNameHandler = (e) => {
    setSelectedFilter((prev) => ({ ...prev, sortByName: e.target.value }));
  };
  const sortByPriceHandler = (e) => {
    setSelectedFilter((prev) => ({ ...prev, sortByPrice: e.target.value }));
  };

  return (
    <div
      style={{
        boxShadow: "1px 1px 6px rgb(186, 186, 186)",
        borderRadius: "7px",
      }}
    >
      <div className="FiltersContainer">
        <h1>Filters</h1>
        <span>Category :</span>
        <select onChange={seletedCategory} className="categoryList">
          <option>Category</option>
          {uniqueCategory.map((e, i) => {
            return (
              <>
                <option value={e} key={i}>
                  {e}
                </option>
              </>
            );
          })}
        </select>
        <span>Rating :</span>
        <Rating value={selectedFilter.rating} onChange={ratingHandler} />
        <span>Price :</span>
        <Box sx={{ width: 220 }}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={selectedFilter.price}
            onChange={priceHandler}
            min={0}
            max={maximumPrice}
            valueLabelDisplay="auto"
          />
        </Box>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>Fast Delivery :</span>
          <input
            checked={selectedFilter.delivery}
            onChange={deliveryHandler}
            type="checkbox"
          ></input>
        </div>
        <span>Order :</span>
        <select className="categoryList" onChange={sortByNameHandler}>
          <option value="AtoZ">A to Z</option>
          <option value="ZtoA">Z to A</option>
        </select>
        <span>Price :</span>
        <select className="categoryList" onChange={sortByPriceHandler}>
          <option value="LowToHigh">Low to High</option>
          <option value="HighToLow">High to Low</option>
        </select>
        <button
          className="clearFilterBtn"
          onClick={() =>
            setSelectedFilter({
              category: null,
              rating: 1,
              price: maximumPrice > 0 ? maximumPrice : 1000,
              delivery: false,
              sortByName: "",
              sortByPrice: "",
            })
          }
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Filters;
