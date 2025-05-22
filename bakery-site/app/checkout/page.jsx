import { handleCheckout } from "../features/requestHandler"
import { useEffect } from "react";

//Create a useEffect that awaits for the handleCheckout promise on component load
//Update state (redux store or useState)
//Display row data in UL

const checkout_data = await handleCheckout();
console.log("Checkout page data: ", checkout_data);

const checkoutPage = () => {
    useEffect(() => {
        //todo
    }, [])
    return(
        <div>
            <ul>

            </ul>
        </div>
    )
}