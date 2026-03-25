const express = require("express");
const mysql = require("mysql");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Database connection
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.log("DB Connection Failed:", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "));
});

// Add order
app.post("/add-order", (req, res) => {
  console.log("DATA RECEIVED:", req.body);

  const { name, email, className, item } = req.body;

  const sql = "INSERT INTO orders (name, email, class, item) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, className, item], (err, result) => {
    if (err) {
      console.log("INSERT ERROR:", err);
      return res.send("Error inserting data");
    } else {
      console.log("Inserted!");
      res.send("Order Placed Successfully ✅");
    }
  });
});

// View orders
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, results) => {
    if (err) {
      return res.send("Error fetching data");
    }
    res.json(results);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});