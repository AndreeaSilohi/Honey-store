import * as React from "react";
import { NavLink } from "react-router-dom";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { ShoppingCart, User, SignOut, HeartStraight } from "phosphor-react";
import "./Navbar.css";
import Box from "@mui/material/Box";
import Cart from "../Cart/Cart";
import logo from "../assets/logo.png";
function Navbar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event?.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (
    <Box
      sx={{
        width: 650,
        display: "flex",
      }}
      role="presentation"
      onClick={(event) => event.stopPropagation()}
      onKeyDown={toggleDrawer("right", false)}
    >
      <Cart />
    </Box>
  );
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

      <ShoppingCart size={28} onClick={toggleDrawer("right", true)}>
        Open Right Drawer
      </ShoppingCart>
      <SwipeableDrawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {list}
      </SwipeableDrawer>

      {/* <div className="sidenav">
        <NavLink onClick={toggleDrawer('right', true)} >
        <SwipeableDrawer
        anchor="right"
        open={state['right']}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {list}
      </SwipeableDrawer>
        <ShoppingCart size={28} />
        </NavLink>


      </div> */}

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
