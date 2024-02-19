import React, { useEffect, useReducer } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";

import logger from "use-reducer-logger";
import "./OurShop.css";

import Product from "../Product/Product";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Shop() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  console.log(products)

  return (
    <div>
      <div className="navbar">
        <Navbar />
      </div>

      <div className="shop">
        <div className="shop-title">
          <h5>Cele mai apreciate produse</h5>
        </div>

        <div className="cards-shop">
          {loading ? (
           <LoadingBox/>
          ) : error ? (
           <MessageBox severity="error">{error}</MessageBox>
          ) : (
            products.map((product) => <Product product={product}></Product>)
          )}
        </div>
      </div>
      {/* 
      {notification && <div className="notification">{notification}</div>} */}

      {/* {selectedProduct && <ProductDetails product={selectedProduct} />} */}
    </div>
  );
}

export default Shop;
