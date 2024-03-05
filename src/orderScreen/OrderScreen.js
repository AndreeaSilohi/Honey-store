import React, { useContext, useEffect, useReducer } from "react";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { Store } from "../Store";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getError } from "../utils";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "../navbar/Navbar";

import "./OrderScreen.css";
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  Grid,
} from "@mui/material";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();

  const { id: orderId } = params;
  const navigate = useNavigate();
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    if (!userInfo) {
      return navigate("/login");
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="container-order">
      <div className="navbar-place-order">
        <Navbar />
      </div>
      <div className="order-content" >
      <h1>Order {orderId}</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card className="mb-3">
            <CardContent>
              <Typography variant="h6">Shipping</Typography>
              <List>
                <ListItem>
                  <strong>Name: </strong>
                  <p>{order.shippingAddress.fullName}</p>
                </ListItem>
                <ListItem>
                  <strong>Address: </strong>
                  <p>
                    {" "}
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                </ListItem>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not delivered</MessageBox>
                )}
              </List>
            </CardContent>
          </Card>

          <Card className="mb-3" style={{ marginTop: "40px" }}>
            <CardContent>
              <Typography variant="h6">Payment</Typography>
              <List>
                <ListItem>
                  <strong>Method: </strong>
                  <p>{order.paymentMethod}</p>
                </ListItem>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not paid</MessageBox>
                )}
              </List>
            </CardContent>
          </Card>

          <Card className="mb-3" style={{ marginTop: "40px" }}>
            <CardContent>
              <Typography variant="h6">Items</Typography>
              <List>
                {order.orderItems.map((item) => (
                  <ListItem key={item._id}>
                    <Grid container alignItems="center">
                      <Grid item xs={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        />
                        <RouterLink to={`/product/${item.slug}`}>
                          {item.name}
                        </RouterLink>
                      </Grid>
                      <Grid item xs={3}>
                        <span>{item.quantity}</span>
                      </Grid>
                      <Grid item xs={3}>
                        ${item.price}
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Order Summary</Typography>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs>
                      Items
                    </Grid>
                    <Grid item xs>
                      ${order.itemsPrice}
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs>
                      Shipping
                    </Grid>
                    <Grid item xs>
                      ${order.shippingPrice}
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs>
                      Tax
                    </Grid>
                    <Grid item xs>
                      ${order.taxPrice}
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs>
                      <strong> Order Total</strong>
                    </Grid>
                    <Grid item xs>
                      <strong>${order.totalPrice}</strong>
                    </Grid>
                  </Grid>
                </ListItem>
                {/* <ListItem>
                  <Grid container justifyContent="center">
                    <Button
                      sx={{
                        fontFamily: "Catamaran, sans-serif",
                        fontSize: "15px",
                        textTransform: "uppercase",
                        color: "black",
                        backgroundColor: "#d77e2b",
                        width: "400px",
                      }}
                      type="button"
                    //   onClick={placeOrderHandler}
                    //   disabled={cart.cartItems.length === 0}
                    >
                      Place Order
                    </Button>
                  </Grid>
                  {loading && <LoadingBox />}
                </ListItem> */}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </div>

    </div>
  );
}
