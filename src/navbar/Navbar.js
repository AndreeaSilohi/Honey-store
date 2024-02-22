import * as React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { ShoppingCart, User, SignOut, HeartStraight } from "phosphor-react";
import "./Navbar.css";
import Box from "@mui/material/Box";
import Cart from "../Cart/Cart";
import logo from "../assets/logo.png";
import Badge from "@mui/material/Badge";

import { Store } from "../Store";
import Drawer from "../Drawer/Drawer";

function Navbar() {
  const [stateCart, setstateCart] = React.useState({
    right: false,
  });

  const { state } = useContext(Store);
  const { cart } = state;

  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (
  //     event?.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }

  //   setstateCart({ ...stateCart, [anchor]: open });
  // };

  // const list = (
  //   <Box
  //     sx={{
  //       width: 650,
  //       display: "flex",
  //     }}
  //     role="presentation"
  //     onClick={(event) => event.stopPropagation()}
  //     onKeyDown={toggleDrawer("right", false)}
  //   >
  //     <Cart />
  //   </Box>
  // );
  return (
    <div className="navbar">
      <img className="logo" src={logo}></img>
      <ul className="nav-links">
        <NavLink
          to="/"
          exact
          className="nav-link"
          style={({ isActive }) =>
            isActive ? { color: "orange" } : { color: "black" }
          }
        >
          Acasa
        </NavLink>
        <NavLink
          to="/shop"
          className="nav-link"
          style={({ isActive }) =>
            isActive ? { color: "orange" } : { color: "black" }
          }
        >
          Magazinul nostru
        </NavLink>
        <NavLink
          to="/about"
          className="nav-link"
          style={({ isActive }) =>
            isActive ? { color: "orange" } : { color: "black" }
          }
        >
          Despre
        </NavLink>
        <NavLink
          to="/curiosities"
          className="nav-link"
          style={({ isActive }) =>
            isActive ? { color: "orange" } : { color: "black" }
          }
        >
          Curiozitati
        </NavLink>
        <NavLink
          to="/contact-form"
          className="nav-link"
          style={({ isActive }) =>
            isActive ? { color: "orange" } : { color: "black" }
          }
        >
          Contact
        </NavLink>
      </ul>

      <NavLink to="/cart" className="nav-link">
        <Badge
          badgeContent={cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
          color="error"
        >
          <ShoppingCart size={28} />
        </Badge>
      </NavLink>

      {/* <div className="shopping-cart">
        <div onClick={toggleDrawer("right", true)}>
          <Badge
            badgeContent={cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
            color="error"
          >
            <ShoppingCart size={28} />
          </Badge>
        </div>
      </div> */}

      {/* <SwipeableDrawer
        anchor="right"
        open={stateCart["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {list}
      </SwipeableDrawer> */}

      <div className="sidenav">
        <NavLink to="/wishlist">
          <HeartStraight size={28} />
        </NavLink>
      </div>

      <div className="profile-icons">
        <NavLink to="/profile">
          <User size={28} />
        </NavLink>
        <SignOut size={28} onClick={handleLogout} />
      </div>
    </div>
  );
}

function handleLogout() {
  // Implement your logout logic here
  console.log("Logout clicked");
}

export default Navbar;
