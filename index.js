const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const { books, cart } = require("./public/js/data.js");
const session = require("express-session");

// session
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// bodyparser
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// on load
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// add to cart
app.post("/add-to-cart", (req, res) => {
  const bookIndex = req.body.index;
  const quantity = parseInt(req.body.quantity, 10);
  // initialize cart if it doesn't exist
  if (!req.session.cart) {
    req.session.cart = [];
  }
  const book = books[bookIndex]; // from data.js
  // check if the book is already in the cart
  const existingItem = req.session.cart.find(
    (item) => item.title === book.title
  );
  // if exists then increase quantity
  if (existingItem) {
    existingItem.quantity += quantity;
    // else add it as a new item
  } else {
    req.session.cart.push({
      title: book.title,
      price: book.price,
      quantity: quantity,
    });
  }
  //   console.log("Cart:", req.session.cart);
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// send cart as api response
app.get("/api/cart", (req, res) => {
  const cart = req.session.cart || [];
  res.json(cart);
});

// update cart api
app.post("/api/cart/update", (req, res) => {
  const { bookIndex, quantity } = req.body;
  const updatedQuantity = parseInt(quantity, 10);
  // if true update
  if (req.session.cart && req.session.cart[bookIndex]) {
    req.session.cart[bookIndex].quantity = updatedQuantity;
  }
  // stay on page after updating
  res.redirect("/html/cart.html");
});

// remove from cart api
app.post("/api/cart/remove", (req, res) => {
  const bookIndex = req.body.bookIndex;
  // if true remove
  if (req.session.cart && req.session.cart[bookIndex]) {
    req.session.cart.splice(bookIndex, 1);
  }
  // stay on page after updating
  res.redirect("/html/cart.html");
});

app.listen(PORT, () => {
  console.log(`server running on port: http://127.0.0.1:${PORT} `);
});
