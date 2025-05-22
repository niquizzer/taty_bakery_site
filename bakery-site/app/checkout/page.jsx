"use client"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCheckout } from "./checkoutSlice";

const checkoutPage = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);
   
    useEffect(() => {
       dispatch(loadCheckout()); 
    }, [dispatch])
    return(
        <div>
            <ul>
                {items.map((item) => {
                    <li key={item.name}>
                        {item.name} - Quantity: {item.quantity}
                    </li>
                })}
            </ul>
        </div>
    )
}

export default checkoutPage;