"use client"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCheckout } from "./checkoutSlice";
import { removeItem } from "./checkoutSlice";

const checkoutPage = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);
    console.log("Items to be displayed: ", items);

    const removeCartItem = (name) => {
        dispatch(removeItem({name}));
    }
    const addSingleCartItem = (name) => {
        //todo dispatch
    }
    const removeSingleCartItem = (name) => {
        //todo dispatch
    }
    useEffect(() => {
       dispatch(loadCheckout()); 
    }, [dispatch])

    return(
        <div>
            <h3>Your Cart</h3>
            <ul>
                {items.map((item) => {
                    return(
                    <li key={item.name}>
                        {item.name} - Quantity: {item.quantity} <button onClick={() => removeCartItem(item.name)}>Delete</button>
                    </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default checkoutPage;
