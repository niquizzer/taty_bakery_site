export let cartData = [];

const addToCart = (name, price) => {

    const item = {
        name,
        price,  
        quantity: 1, 
    }
    
    cartData.push(item);
    console.log(cartData);
};

export default addToCart;
// This file contains the cart data for the bakery site.
// It is an empty array that will be populated with items added to the cart.