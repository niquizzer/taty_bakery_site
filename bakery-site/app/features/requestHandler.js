export const addCart = async (id, name, quantity, price) => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/add-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, quantity, price }),
    });
    if (!res.ok) {
      throw new Error(`Failed to add to cart: ${res.status}`);
    }
    const data = await res.json();
    console.log("addCart response: ", data);

  } catch (err) {
    console.error("Error in addCart:", err.message);
  }
};

export const handleCheckout = async () => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/load-checkout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to checkout: ${res.status}`);
    }
    const rows = await res.json();
    console.log("checkout response: ", rows);
    return rows;
  } catch (err) {
    console.error("Error in checkout:", err.message);
  }
};