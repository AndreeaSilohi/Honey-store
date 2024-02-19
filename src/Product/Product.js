
import React, { useState, useContext, useEffect, useReducer } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { WishlistContext } from "../WishListContextProvider";
import ProductDetails from "../ProductDetails/ProductDetails";
 function Product(props) {
  const { product } = props;

  const { wishListItems, addToWishlist } = useContext(WishlistContext);
  const [notification, setNotification] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleAddToWishlist = (productId, event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!wishListItems[productId]) {
      addToWishlist(productId);
      setNotification(`${productId} a fost adaugat in wishlist`);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };
  return (
    <div>
    <Link
      to={`/product-details/${product.id}/${product.name}/${product.price}/${
        product.description
      }/${encodeURIComponent(product.image)}/${product.additional}/${
        product.stoc
      }/${product.slug}`}
      key={product.name}
    >
      <Card
        className="card"
        sx={{
          backgroundColor: "#edcea8",
          border: "2px solid #ccc",
        }}
        onClick={() => handleCardClick(product)}
      >
        <CardActionArea>
          <CardMedia
            className="card-content"
            component="img"
            image={product.image}
            alt={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pret: {product.price} de lei
            </Typography>
          </CardContent>
        </CardActionArea>
        <IconButton
          onClick={(event) => handleAddToWishlist(product.id, event)}
          aria-label="Add to Wishlist"
          color={wishListItems[product.id] ? "secondary" : "default"}
        >
          <FavoriteIcon />
        </IconButton>
      </Card>
    </Link>
    {notification && <div className="notification">{notification}</div>}

      {selectedProduct && <ProductDetails product={selectedProduct} />}
    </div>
  );
}

export default Product;