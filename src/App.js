import "./App.css";
import Footer from "./Footer";
import HomePage from "./Home/HomePage";
import About from "./About/About";
import Contact from "./Contact/Contact";
import OurShop from "./OurShop/OurShop";
import Profile from "./Profile/Profile";
import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactForm from "./ContactForm/ContactForm";
import ProductDetails from "./ProductDetails/ProductDetails";
import Curiosities from "./Curiosities/Curiosities";
import Cart from "./Cart/Cart";
import { ShopContextProvider } from "./ShopContextProvider";
import { WishlistProvider } from "./WishListContextProvider";
import WishList from "./Wishlist/Wishlist";

function App() {
  return (
    <WishlistProvider>
    <ShopContextProvider>
    <Router>
      <div style={{ fontFamily: "sans-serif", width: "100%", minHeight: "100vh" }}>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<OurShop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-form" element ={<ContactForm/>}/>
          <Route path="/product-details/:id/:name/:price/:description/:image" element={<ProductDetails />} />
          <Route path="/curiosities" element={<Curiosities/>}/>
          <Route path="/profile" element ={<Profile/>}/>
          <Route path="/cart" element ={<Cart/>}/>
          <Route path="/wishlist" element ={<WishList/>}/>

        </Routes>
        <Footer />
      </div>
    </Router>
    </ShopContextProvider>
    </WishlistProvider>
 
  );
}

export default App;
