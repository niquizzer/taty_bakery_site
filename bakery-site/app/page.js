"use client";

import { CartProvider } from "use-shopping-cart";
import App from "./App";

export default function Home() {
  return (
    <CartProvider
    mode ="payment"
    stripe={process.env.STRIPE_PUBLIC_KEY}
    currency="USD"
    successUrl="stripe.com"
    cancelUrl="google.com"
    allowedCountries={["US", "CA"]}
    billingAddressCollection={true}
    >
    <App />
    </CartProvider>
  ) 
}
