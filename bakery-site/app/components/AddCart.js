import addToCart from "@/data/cartData";

const AddCart = () => {
    return (
        <div className="add-cart">
            <button onClick={() => {addToCart("Birthday Cake", 20)}} className="add-cart-button">
                Add to Cart
            </button>
        </div>
    );
}

export default AddCart;