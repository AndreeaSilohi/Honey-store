import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import "./ShippingAddress.css";
import { Store } from "../Store";
import { useContext } from "react";

export default function ShippingAddress() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };

  return (
    <div className="container-shipping">
      <div className="navbar-shipping">
        <Navbar />
      </div>
      <div className="form-shipping">
        <form className="mat-form" onSubmit={submitHandler}>
          <h1 className="text-center">Shipping Address</h1>
          <div className="form-shipping-content">
            <div className="form-group">
              <div className="row">
                <div className="col-sm-6">
                  <TextField
                   style={{ marginBottom: "25px" }}
                    label="Full name"
                    variant="standard"
                    fullWidth
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <TextField
                   style={{ marginBottom: "25px" }}
                    label="Address"
                    variant="standard"
                    fullWidth
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-sm-6">
                  <TextField
                   style={{ marginBottom: "25px" }}
                    label="City"
                    variant="standard"
                    fullWidth
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <TextField
                   style={{ marginBottom: "25px" }}
                    label="Postal code"
                    variant="standard"
                    fullWidth
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-sm-6">
                  <TextField
                   style={{ marginBottom: "25px" }}
                    label="Country"
                    variant="standard"
                    fullWidth
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div style={{ padding:"20px" }}>
              <Button
                variant="contained"
                className="continue"
                type="submit"
                style={{ backgroundColor: "#D77E2B" }}
              >
                Continue
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
