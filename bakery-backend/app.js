import sqlite3 from "sqlite3";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

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

const sql_create = `INSERT INTO cart_items(id, name, price, quantity) VALUES (?,?,?,?)`;
const sql_delete = `DELETE FROM cart_items() WHERE quantity -= 1`;
const sql_read = `SELECT * FROM cart_items`;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Sends a Insert Into SQL query to sqlite
app.post("/add-cart", async (req, res) => {
  const data = req.body;
  console.log("I have an add-cart req: ", data);
  res.json({ 
    message: "Items successfully added to cart",
    data: data,
  });
  try {
    db.run(sql_create, [data.id, data.name, data.quantity, data.price], (err) => {
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
// Retrieves rows from the cart_data table
app.get("/load-checkout", async (req, res) => {
    console.log("I have a load-checkout req");
    db.all(sql_read, [], (err, rows) => {
        if (err) {
            console.error("Error getting the data from cart_items: ", err.message);
        } else {
            console.log("Current cart items: ", rows )
            res.send(rows);
        }
    });
});
app.delete("/delete", async (req, res) => {
    //todo
    console.log("I have a delete req");
    db.run(sql_delete, [], (err) => {
        if (err) {
            console.error("There's a problem deleting this item: ", err.message);
        } else {
            console.log("Item deleted successfully");
        }
    })
});
app.post("/checkout", async (req, res) => {
  console.log("I have a checkout req");
  res.json({ message: "Checkout successfully initiated" });
  db.run()
});

app.listen(8000, () => {
  console.log("Server starting at port 8000");
});