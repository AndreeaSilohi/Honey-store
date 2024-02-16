import React, { useContext } from "react";
import { ShopContext } from "../ShopContextProvider";

import "./CartItem.css";
export const CartItem = (props) => {
  const { id, name, price, description, image } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  return (
    <div class="cartItem">
      <img src={image}  />
      <div>
        <div className="description">
          <p >
            <b>{name}</b>
          </p>
          <p style={{marginLeft:"20px"}} > {price} lei</p>
        </div>
      </div>
      <div className="countHandler">
        <button onClick={() => removeFromCart(id)}> - </button>
        <input
          value={cartItems[id]}
          onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
        />
        <button onClick={() => addToCart(id)}> + </button>
      </div>
    </div>
  );
};
