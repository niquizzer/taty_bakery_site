"use client";

import { useDispatch } from "react-redux";
import { addItem } from "../checkout/checkoutSlice";
import { useRouter } from "next/navigation";

const App = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddCart = (name, quantity, price) => {
    const data = dispatch(addItem({ name, quantity, price }));
    console.log("Adding items to cart: ", data);
  };
  return (
    <div>
      <button type="button" onClick={() => router.push("/checkout")}>
        Checkout
      </button>
      <div>
        Cake Pops
        <button onClick={() => handleAddCart("Cake Pops", 1, 5.99)}>
          Add to Cart
        </button>
      </div>
      <div>
        Chocolate Cake
        <button onClick={() => handleAddCart("Chocolate Cake", 1, 10.99)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default App;
