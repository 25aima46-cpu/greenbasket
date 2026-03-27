const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();

app.use(express.json());

// ✅ SERVE STATIC FILES
app.use(express.static(path.join(__dirname, "../")));

// ✅ MYSQL CONNECTION
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect(err => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

// ✅ ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.get("/portfolio", (req, res) => {
  res.sendFile(path.join(__dirname, "../portfolio.html"));
});

// ✅ INSERT ORDER
app.post("/add-order", (req, res) => {
  const { name, product, quantity } = req.body;

  const sql = "INSERT INTO orders (name, product, quantity) VALUES (?, ?, ?)";

  db.query(sql, [name, product, quantity], (err) => {
    if (err) {
      console.log(err);
      res.send("Error inserting data ❌");
    } else {
      res.send("Order Placed Successfully ✅");
    }
  });
});

// ✅ PORT
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});