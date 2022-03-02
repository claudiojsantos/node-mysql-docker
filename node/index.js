const express = require("express");
const app = express();
const mysql = require("mysql");
const { faker } = require("@faker-js/faker");

const config = {
  host: "db",
  user: "root",
  password: "desafio",
  database: "desafiodb",
};

const connection = mysql.createConnection(config);
const name = faker.name.findName();
const sql = `INSERT INTO people(name) VALUES("${name}")`;
connection.query(sql);

app.get("/", (req, res) => {
  const sql = "SELECT name FROM people";
  connection.query(sql, (err, result, fields) => {
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ol>
        ${
          !!result.length
            ? result.map((el) => `<li>${el.name}</li>`).join("")
            : ""
        }
      </ol>
    `);
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
