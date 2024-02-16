import React, { useContext } from "react";
import { WishlistContext } from "../WishListContextProvider";
import "./Wishlist.css";


export const WishListItem = (props) => {
  const { id, name, price, description, image } = props.data;
  const { wishListItems, addToWishlist,removeFromWishlist} =
    useContext(WishlistContext);

  return (
    <div className="itemWishList">
      <img src={image} className="wishListItemImage"/>
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p>{price} lei</p>
        
      </div>
    </div>
  );
};
