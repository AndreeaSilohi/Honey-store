import React, { useContext } from "react";
import { ShopContext } from "../ShopContextProvider";
import "./CartItem.css";

export const CartItem = (props) => {
  const { id, name, price, description, image, additional } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  return (
    <div className="cart-table">

      <div className="table-content">
        <div className="table-content-1">
          <div className="img-name">
          <img src={image} />
          {name}
          </div>
         
        </div>
        <div className="table-content-2">
          {price}
        </div>
        <div className="table-content-3">

        <button onClick={() => removeFromCart(id)}> - </button>
        <input
          value={cartItems[id]}
          onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
        />
        <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};
