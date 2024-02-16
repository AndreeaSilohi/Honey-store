import React, { useState, useContext } from "react";
import Navbar from "../navbar/Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import ProductDetails from "../ProductDetails/ProductDetails";
import "./OurShop.css";
import { productsData } from "../Products";
import { WishlistContext } from "../WishListContextProvider";

function Shop() {
  const { wishListItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const [notification, setNotification] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

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
          {productsData.map((product) => (
            <Link
              to={`/product-details/${product.id}/${product.name}/${product.price}/${
                product.description
              }/${encodeURIComponent(product.image)}`}
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
                  color={
                    wishListItems[product.id] ? "secondary" : "default"
                  }
                  
                >
                  <FavoriteIcon />
                </IconButton>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {notification && <div className="notification">{notification}</div>}

      {selectedProduct && <ProductDetails product={selectedProduct} />}
    </div>
  );
}

export default Shop;
