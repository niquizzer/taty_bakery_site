"use client";

import { handleCheckout } from "./features/requestHandler"
import { addCart } from "./features/requestHandler"

export default function IndexPage() {
   return (
        <div>
          <button onClick={() => handleCheckout()}>
            Checkout
          </button>
          <button onClick={() => addCart()}>
            Add to Cart
          </button>
      </div>
    );
  }