import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Helper function to establish a database connection
async function getDbConnection() {
    return open({
        filename: './database.sqlite', // Adjust the path to your SQLite database
        driver: sqlite3.Database,
    });
}
// Establish a database connection
const db = await getDbConnection();

export async function POST(req) {
    const { productId, quantity } = await req.json();
    try {
        // Validate input
        if (!productId || !quantity || quantity <= 0) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }
        // Insert the item into the cart_items table
        await db.run(
            `INSERT INTO cart_items (product_id, quantity) 
             VALUES (?, ?)
             ON CONFLICT(product_id) DO UPDATE SET quantity = quantity + ?`,
            [productId, quantity, quantity]
        );

        // Return a success response
        return NextResponse.json({ message: "Item added to cart successfully" });
    } catch (err) {
        console.error("Error adding item to cart:", err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PUT(req) {
//todo    
}
export async function GET(req) {
//todo    
}
export async function DELETE(req) {
   const { productId } = await req.json();
   try {
        // Validate input
        if (!productId) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

    await db.run(
       `DELETE FROM cart_items 
       WHERE quantity = ? AND product_id = ?`,
       [productId]
    )
    return NextResponse.json({message: "Item successfully deleted"});
   } catch (err) {
    console.error(err.message)
   }
}