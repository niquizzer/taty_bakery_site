const sqlite3 = require("sqlite3").verbose();

// Conntecting to/creating a new SQLite database
const db = new sqlite3.Database(
    "./collection.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
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
        `CREATE TABLE cart_items (
            id INTEGER AUTO_INCREMENT,
            user_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY (product_id) REFERENCES items(id)
          )`,
          (err) => {
            if (err) {
                return console.error(err.message);
            }
          }
    )
    console.log("Created items table");
    })
