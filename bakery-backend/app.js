import sqlite3 from "sqlite3";
import express from "express";
import cors from "cors";
import { execute } from "../bakery-database/connect.js";
import path from "path";

const app = express();

const dbPath = path.resolve(__dirname, "../bakery-database/collection.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

const sql = `INSERT INTO cart_items(id, name, price, quantity) VALUES (?,?,?,?)`;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/add-cart", async (req, res) => {
  const data = req.body;
  console.log("I have an add-cart req: ", data);
  res.json({ 
    message: "Items sucessfully added to cart",
    data: data,
  });
  try {
    await execute(db, sql, [ data.id, data.name, data.quantity, data.price]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/checkout", async (req, res) => {
  console.log("I have a checkout req");
  res.json({ message: "Checkout successfully initiated"});
});

app.listen(8000, () => {
  console.log("Server starting at port 8000");
});