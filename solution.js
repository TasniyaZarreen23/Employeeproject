import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "employees",
  password: "#Zarreen23.",
  port: 5432,
});

db.connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err.stack));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs'); 

let items = [
  { employeeID: 1, employeeName: "angila", designation:"Web Developer",gender:"F"},
  { employeeID: 2, employeeName: "jon",designation: "Software Developer", gender:"M"},
];


app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM employees");
    const items = result.rows;

    res.render("index.ejs", {
      listTitle: "Employees Record",
      listItems: items,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});



app.post("/add", async (req, res) => {
  const { employeeID, employeeName, designation, gender } = req.body;

  try {
    await db.query(
      "INSERT INTO employees (employeeid, employeename, designation, gender) VALUES ($1, $2, $3, $4)",
      [employeeID, employeeName, designation, gender]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/edit", async (req, res) => {
  const { employeeID, employeeName, designation, gender } = req.body;

  console.log("Editing:", { employeeID, employeeName, designation, gender }); // Debugging

  try {
    await db.query(
      "UPDATE employees SET employeename = $1, designation = $2, gender = $3 WHERE employeeid = $4",
      [employeeName, designation, gender, employeeID]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/delete", async (req, res) => {
  const { employeeID } = req.body;

  try {
    await db.query("DELETE FROM employees WHERE employeeid = $1", [employeeID]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
