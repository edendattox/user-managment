const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// Parseing middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Static Files
app.use(express.static("public"));

// Templating Engine
const handlebars = exphbs.create({ extname: ".hbs" });
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

// const routes = require("./server/routes/user");

// app.use("/", routes);

app.get("", (req, res) => {
  res.render("home");
});

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect to DB
pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Connected to DB");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
