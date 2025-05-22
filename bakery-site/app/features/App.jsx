import { useDispatch } from 'react-redux';
import { addItem } from '../checkout/checkoutSlice';

const App = () => {
  const dispatch = useDispatch();
    const handleAddCart = (name, quantity, price) => {
        const data = dispatch(addItem({ name, quantity, price }));
        console.log("Adding items to cart: ", data);
    };
    return (
    <div>
        <button type="link" src="./checkout">
          Checkout
        </button>
        <button onClick={() => handleAddCart("Cake Pops", 1, 5.99)}>
          Add to Cart
        </button>
      </div>
    )
}

export default App;