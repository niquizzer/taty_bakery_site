import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

//Grab the current file path
const __filename = fileURLToPath(import.meta.url);

//Get the directory of current file path
const __dirname = path.dirname(__filename);

// Resolve the database path
const dbPath = path.resolve(__dirname, "./collection.db");
console.log("Current dbPath: ", dbPath)

// Connecting to/creating a new SQLite database
const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error("Error opening database:", err.message);
    }
    console.log("Connected to the SQLite DB");
  }
);

// Run all these steps in order
db.run(
  `CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price INTEGER NOT NULL DEFAULT 1
  )`,
  (err) => {
    if (err) {
      return console.error("Error creating table:", err.message);
    }
    console.log("Table created successfully.");
  }
);
