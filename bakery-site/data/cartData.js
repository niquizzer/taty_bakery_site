import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

//Perform a database query to retrieve all items from the "items" table
export const cartData = await db.all("SELECT * FROM items");

const addToCart = (name, price) => {

    //todo, query db to retrieve all items, seperate functions based on item?
    //Return the items as a JSON response with status 200

    return new Response(JSON.stringify(cartData), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });

    const item = {
        name,
        price,  
        quantity: 1, 
    }
    
    cartData.push(item);
    console.log(cartData);
};

const removeFromCart = () => {
//todo
}

export default addToCart;

// This file contains the cart data for the bakery site.