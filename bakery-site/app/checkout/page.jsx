"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCheckout } from "./checkoutSlice";
import { removeItem } from "./checkoutSlice";
import { adjustCartAmount } from "./checkoutSlice";

const checkoutPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  console.log("Items to be displayed: ", items);

  const removeCartItem = (name) => {
    dispatch(removeItem({ name }));
  };
  const updateCart = (name, adjustment) => {
    dispatch(adjustCartAmount({ name, adjustment }));
  };
  useEffect(() => {
    dispatch(loadCheckout());
  }, [dispatch]);

  return (
    <div>
      <h3>Your Cart</h3>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.name}>
              {item.name} - Quantity: {item.quantity}
              <button onClick={() => removeCartItem(item.name)}>Delete</button>
              <button onClick={() => updateCart(item.name, 1)}>+</button>
              <button onClick={() => updateCart(item.name, -1)}>-</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default checkoutPage;
