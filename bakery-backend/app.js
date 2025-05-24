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

const sql_create = `
  INSERT INTO cart_items(name, quantity, price)
  VALUES (?, ?, ?)
  ON CONFLICT(name) DO UPDATE SET quantity = quantity + excluded.quantity`;

const sql_delete = `DELETE FROM cart_items WHERE name = ?`;

const sql_read = `SELECT * FROM cart_items`;

const sql_update = `UPDATE cart_items
  SET quantity = quantity + ?
  WHERE name = ?`;

const sql_remove_zero = ` 
  DELETE FROM cart_items
  Where name = ? AND quantity <= 0`;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Sends a Insert Into SQL query to sqlite
app.post("/add-cart", async (req, res) => {
  const data = req.body;
  console.log("I have an add-cart req: ", data);
  try {
    db.run(sql_create, [data.name, data.quantity, data.price], (err) => {
      if (err) {
        console.error("Trouble sending data to DB: ", err.message);
        res.status(500).json({ message: "Failed to add item" });
      } else {
        // After successful insert/update, get all items
        db.all(sql_read, [], (err, rows) => {
          if (err) {
            console.error("Error getting updated cart items: ", err.message);
            res.status(500).json({ message: "Failed to get updated cart" });
          } else {
            res.send(rows); // Send back the array of all cart items
          }
        });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Retrieves rows from the cart_data table
app.get("/load-checkout", async (req, res) => {
  console.log("I have a load-checkout req");
  db.all(sql_read, [], (err, rows) => {
    if (err) {
      console.error("Error getting the data from cart_items: ", err.message);
    } else {
      console.log("Current cart items: ", rows);
      res.send(rows);
    }
  });
});

app.delete("/delete", async (req, res) => {
  const { name } = req.body;
  console.log("I have a delete req for item:", name);
  try {
    db.run(sql_delete, [name], (err) => {
      if (err) {
        console.error("There's a problem deleting this item: ", err.message);
        res.status(500).json({ message: "Delete failed" });
      } else {
        // After successful delete, get all items
        db.all(sql_read, [], (err, rows) => {
          if (err) {
            console.error("Error getting updated cart items: ", err.message);
            res.status(500).json({ message: "Failed to get updated cart" });
          } else {
            res.send(rows); // Send back the array of all cart items
          }
        });
      }
    });
  } catch (error) {
    console.error("Error deleting item: ", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/checkout", async (req, res) => {
  console.log("I have a checkout req");
  try {
    res.json({ message: "Checkout successfully initiated" });
  } catch (error) {
    console.error("Checkout error:", error.message);
    res.status(500).json({ message: "Checkout failed" });
  }
});

app.put("/update-item", async (req, res) => {
  console.log("I have an update req: ", req.body);
  const { name, adjustment } = req.body;
  db.run(sql_update, [adjustment, name], (err, rows) => {
    if (err) {
      console.error("Trouble updating the cart: ", err.message);
    } else {
      db.all(sql_read, [], (err, rows) => {
        if (err) {
          console.error("Error getting updated cart items: ", err.message);
          res.status(500).json({ message: "Failed to get updated cart" });
        } else {
          res.send(rows); // Send back the array of all cart items
        }
      });
    }
  });
});

app.listen(8000, () => {
  console.log("Server starting at port 8000");
});
