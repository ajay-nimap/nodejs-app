const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "root",
    database: "nodejs_login"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected");
});

// Show form
app.get("/", (req, res) => {
    res.render("index");
});

// Save data
app.post("/add-user", (req, res) => {
    const { name, email } = req.body;

    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";

    db.query(sql, [name, email], (err, result) => {
        if (err) throw err;

        res.send("User Added Successfully");
    });
});

// View all users
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) throw err;

        res.render("users", {
            users: results
        });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});