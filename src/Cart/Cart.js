import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productsData } from "../Products";
import { CartItem } from "./CartItem";
import { ShopContext } from "../ShopContextProvider";
import Navbar from "../navbar/Navbar";
import React from "react";
import "./Cart.css";
function Cart() {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();
  

  return (
    <div className="wrapper">
      <div className="cart">
        {/* <div className="navbar">
          <Navbar />
        </div> */}
        <div className="cartTitle" >
          <h1>Cosul tau </h1>
        </div>
        <div className="cartItems">
          {productsData.map((product) => {
            if (cartItems[product.id] !== 0) {
              return <CartItem data={product} />;
            }
          })}
        </div>
        {totalAmount > 0 ? (
          <div className="checkout">
            <p>Subtotal: {totalAmount} lei</p>
            <button onClick={() => navigate("/shop")}>Continue Shopping</button>
            <button>Checkout</button>
          </div>
        ) : (
          <h1>Your cart is empty</h1>
        )}
      </div>
    </div>


  );
}
export default Cart;
