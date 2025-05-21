import sqlite3 from "sqlite3";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
// import { execute } from "../bakery-database/connect.js";

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const dbPath = path.resolve(__dirname, "../bakery-database/collection.db");
console.log("Resolved db path:", dbPath);
console.log("Current working directory:", process.cwd());

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
    message: "Items successfully added to cart",
    data: data,
  });
  try {
    db.run(sql, [data.id, data.name, data.quantity, data.price], (err) => {
        if (err) {
            console.error("Trouble sending data to DB: ", err.message);
        } else {
            console.log("Successfully sent data to DB");
        }
    });
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/checkout", async (req, res) => {
  console.log("I have a checkout req");
  res.json({ message: "Checkout successfully initiated" });
});

app.listen(8000, () => {
  console.log("Server starting at port 8000");
});