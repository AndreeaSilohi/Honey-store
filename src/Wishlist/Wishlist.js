import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { productsData } from "../Products";
import { WishlistContext } from "../WishListContextProvider";
import Navbar from "../navbar/Navbar";
import "./WishListItem.css";
import { WishListItem } from "./WishListItem";

import React from "react";
function WishList() {
  const { wishListItems ,wishlist} = useContext(WishlistContext);
  const navigate = useNavigate();

console.log(productsData)
  
  return (
    <div className="wrapper">
      <div className="wishList">
        <div className="navbar">
          <Navbar />
        </div>
        <div>
          <h1>Your Wishlist Items</h1>
        </div>
        <div className="cartItems">
          {productsData.map((product) => {
            if (wishListItems[product.id] !== 0) {
              return <WishListItem data={product} />;
            }
          })}
        </div>
       
      </div>
    </div>


  );
}
export default WishList;
