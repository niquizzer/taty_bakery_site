import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { Product } from "./Product";
import { CartItems } from "./CartItems";

const productData = [
    {
      name: "cake-pop",
      price_id: "price_1RNI4oDAqI5jeLzcl3b13BSu",
      price: 20,
      image: "/images/chocolate-cake.jpg",
      currency: "USD",  
    }
];
const App = () => {
    const { totalPrice, redirectToCheckout, cartCount } = useShoppingCart();
    return (
        <div>
            <h1>Welcome to the Bakery</h1>
            <p>We bake the best cakes in town!</p>
            <div className="test_cake">
                {/* <Image
                    src={testImage}
                    alt="Chocolate Cake"
                    width={500}
                    height={500}
                    className="cake_image"
                    /> */}
                <div className="cake_info">
                    <h2>Chocolate Cake</h2>
                    <p>Price: $20.00</p>
                </div>
                    <div>
                        {productData.map((product) => (
                            <Product product={product} />
                        ))}
                    {/* This is where we'll render our cart */}
                    <p>Number of Items: {cartCount}</p>
                    <p>Total: {totalPrice}</p>
                    <CartItems />

                    {/* Redirects the user to Stripe */}
                    <button onClick={redirectToCheckout}>Checkout</button>
                    </div>
            </div>
        </div>
    );
}

export default App;