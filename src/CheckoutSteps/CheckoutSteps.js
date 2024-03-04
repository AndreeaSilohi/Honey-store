import React from "react";
import { Grid, Typography } from "@mui/material";
import "./CheckoutSteps.css"; // Import the CSS file

const CheckoutSteps = (props) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <div className="checkout-steps">
        <div>
          <StepItem label="Sign-In" active={props.step1} />
        </div>
        <div>
          <StepItem label="Shipping" active={props.step2} />
        </div>
        <div>
          <StepItem label="Payment" active={props.step3} />
        </div>
        <div>
          <StepItem label="Place Order" active={props.step4} />
        </div>
      </div>
    </Grid>
  );
};

const StepItem = ({ label, active }) => {
  return (
    <Grid item>
      <Typography
        variant="body1"
        className={`step-item ${active ? "active-step" : ""}`}
      >
        {label}
      </Typography>
    </Grid>
  );
};

export default CheckoutSteps;
