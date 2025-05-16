const sqlite3 = require("sqlite3").verbose();

// Conntecting to/creating a new SQLite database
const db = new sqlite3.Database(
    "./collection.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            return console.error(err.mesage);
        }
        console.log("Connected to the SQLite DB");
    }
);

// Run all these steps in order
db.serialize (() => {
    db.run (
        `CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY,
            name TEXT,
            price INTEGER,
            quantity INTEGER,
            description TEXT,
            img TEXT
          )`,
          (err) => {
            if (err) {
                return console.error(err.message);
            }
          }
    )
    console.log("Created items table");

    const cakePop = [
        "Cake Pops",
        5,
        10
    ];
    const chocolateCake = [
        "Chocolate Cake",
        5,
        10
    ];

    const insertSql = 'INSERT INTO items(name, price, quantity) VALUES (?, ?, ?)';

    db.run(insertSql, cakePop, function (err) {
        if (err) {
            return console.error(err.message);
        }
        const id = this.lastID;
        console.log ('Rows inserted, ID ${id}');
    })
    db.run(insertSql, chocolateCake, function (err) {
        if (err) {
            return console.error(err.message);
        }
        const id = this.lastID;
        console.log ('Rows inserted, ID ${id}');
    })

    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Closed the DB connection")
    })

    })
