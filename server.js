//main server file

const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json()); // for parsing json in req body

const data = require("./books.json");

app.get("/books", function (req, res) {
  readBooks(req, res);
});

app.post("/books", function (req, res) {
  createBook(req, res);
});

app.put("/books/:id", function (req, res) {
  updateBook(req, res);
});

app.delete("/books/:id", function (req, res) {
  deleteBook(req, res);
});

function createBook(req, res) {
  if (
    typeof req.body == "undefined" ||
    typeof req.body.title == "undefined" ||
    typeof req.body.author == "undefined"
  ) {
    res.status(400);
    res.send("invalid request");
    return;
  }
  const id = uuidv4();
  let newBook = {
    id: id,
    title: req.body.title,
    author: req.body.author,
  };
  data.push(newBook);
  res.send(id);
}

function readBooks(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(data);
}

app.listen(3000);
