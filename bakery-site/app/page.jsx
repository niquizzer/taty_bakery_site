"use client";

import { handleCheckout } from "./features/requestHandler"
import { addCart } from "./features/requestHandler"

export default function IndexPage() {
   return (
        <div>
          <button onClick={() => handleCheckout()}>
            Checkout
          </button>
          <button onClick={() => addCart(1, "Cake Pops", 1, 5)}>
            Add to Cart
          </button>
          <button onClick={() => addCart(1, "Chocolate Cake", 1, 20)}>
            Add to Cart
          </button>
      </div>
    );
  }