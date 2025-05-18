const express = require("express");
const cors = require("cors");

const app = express();

// Use the CORS middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/add-cart", (req, res) => {
  console.log("I have an add-cart req");
  res.json({ message: "Item successfully added to cart"});
});

app.post("/checkout", (req, res) => {
  console.log("I have a checkout req");
  res.json({ message: "Checkout successfully initiated"});
});

app.listen(8000, () => {
  console.log("Server starting at port 8000");
});