// ProductDetails.js

import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button } from "@mui/material";
import Navbar from "../navbar/Navbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./ProductDetails.css";
import productSingle from "../assets/productSingle.jpg";
import { ShopContext } from "../ShopContextProvider";

const ProductDetails = () => {
  const [notification, setNotification] = useState(null);
  const { id, name, price, description, image } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems } = useContext(ShopContext); // Use the ShopContext
  const cartItemAmount = cartItems[id];

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(id);
    setNotification(` Ai adaugat ${decodeURIComponent(name)} in cos`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  return (
    <div className="detalii-page">
      <div className="detalii-navbar">
        <Navbar />
      </div>

      <div >
        <img  className="product-single" src={productSingle} />
      </div>
      <div className="detalii-container">
        <div className="detalii-left">
          <div className="detalii-card">
            <Card
              sx={{
                maxWidth: 400,
                width: "100%",
              }}
            >
              <CardActionArea>
                <CardMedia
                  className="card-media"
                  component="img"
                  src={decodeURIComponent(image)}
                  alt="Miere"
                />
              </CardActionArea>
            </Card>
          </div>
        </div>

        <div className="detalii-right">
          <div className="detalii-titlu">
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              sx={{
                fontFamily: "Catamaran, sans-serif",
                fontSize: "35px",
                textTransform: "uppercase",
              }}
            >
              {decodeURIComponent(name)}
            </Typography>
          </div>
          <div className="detalii-pret">
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Catamaran, sans-serif",
                fontSize: "35px",
                textTransform: "uppercase",
              }}
            >
              {price} lei
            </Typography>
          </div>
          <div className="detalii-quantity">
            <Button
              variant="contained"
              style={{ backgroundColor: "#d77e2b" }}
              onClick={handleAddToCart}
              sx={{
                fontFamily: "Catamaran, sans-serif",
                fontSize: "15px",
                textTransform: "uppercase",
              }}
            >
              Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
            </Button>
          </div>
          <div className="detalii-descriere"></div>
          <div className="accordion-detalii">
            <Accordion
              sx={{
                backgroundColor: "#edcea8",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  fontFamily: "YourChosenFont, sans-serif", // Set the desired font
                }}
              >
                <Typography>Detalii despre produs</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    // fontFamily: "Quicksand, sans-serif",
                    fontSize: "15px",
                  }}
                >
                  {decodeURIComponent(description)}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="accordion-recenzii">
            <Accordion
              sx={{
                backgroundColor: "#edcea8",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                // sx={{
                //   fontFamily: "YourChosenFont, sans-serif", // Set the desired font
                // }}
              >
                <Typography>Recenzii</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    fontFamily: "Quicksand, sans-serif",
                    fontSize: "15px",
                  }}
                >
                  {decodeURIComponent(description)}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default ProductDetails;
