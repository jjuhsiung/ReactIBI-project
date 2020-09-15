const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "DB1"
});

app.get("/api/select", (req, res) => {
  const sqlfilterGender = "SELECT * FROM donor;";
  db.query(sqlfilterGender, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

app.post("/api/filterGender", (req, res) => {
  console.log("api filter gender");
  const gender = req.body.gender;
  console.log(gender);
  const sqlfilterGender = "SELECT * FROM donor WHERE gender = ?;";
  db.query(sqlfilterGender, [gender], (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
});

app.post("/api/searchFile", (req, res) => {
  console.log("api search");
  const file = req.body.file;
  console.log(file);
  const sqlfilterGender = "SELECT * FROM file WHERE path LIKE '%" + file + "%';";
  db.query(sqlfilterGender, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

// 2.	Filtering: Develop a webpage that allows users to list and filter donors,
// e.g. https://portal.hubmapconsortium.org/search?entity_type[0]=Donor
// a.	Filter by gender or age in table donor
// b.	A search box to search table donor:medical and table file:path
// 3.	REST API
// a.	Get info for one donor from table donor http://openlibrary.org/api/books?bibkeys=ISBN:0201558025
// b.	Get info for all donors from table donor
