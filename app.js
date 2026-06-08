const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

let db;

// =======================
// DB CONNECTION (RETRY SAFE)
// =======================
function connectDB() {
  db = mysql.createConnection({
    host: "mysql",      // Docker service name
    user: "root",
    password: "root",
    database: "nodejs_login"
  });

  db.connect((err) => {
    if (err) {
      console.log("MySQL not ready, retrying in 5 seconds...");
      setTimeout(connectDB, 5000);
      return;
    }

    console.log("MySQL Connected");
  });
}

connectDB();

// =======================
// ROUTES
// =======================

// Home route (optional safety page)
app.get("/", (req, res) => {
  res.send("Server is running");
});

// View all users
app.get("/users", (req, res) => {
  if (!db) {
    return res.send("Database not connected yet, try again...");
  }

  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.log("Query error:", err.message);
      return res.send("Database error");
    }

    res.render("users", { users: results });
  });
});

// =======================
// START SERVER
// =======================
app.listen(3000, () => {
  console.log("Server running on port 3000");
});