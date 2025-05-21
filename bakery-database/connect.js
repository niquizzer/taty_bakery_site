import sqlite3 from "sqlite3";

// Conntecting to/creating a new SQLite database
const db = new sqlite3.Database(
    "./collection.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connected to the SQLite DB");
    }
);

// Run all these steps in order
db.serialize (() => {
    db.run (
        `CREATE TABLE IF NOT EXISTS cart_items (
            id INTEGER NOT NULL,
            name TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            price INTEGER NOT NULL DEFAULT 1
          )`,
          (err) => {
            if (err) {
                return console.error(err.message);
            }
          }
    )
    })

    export const execute = async (db, sql, params = []) => {
        if (params && params.length > 0) {
          return new Promise((resolve, reject) => {
            db.run(sql, params, (err) => {
              if (err) reject(err);
              resolve();
            });
          });
        }
        return new Promise((resolve, reject) => {
          db.exec(sql, (err) => {
            if (err) reject(err);
            resolve();
          });
        });
      };