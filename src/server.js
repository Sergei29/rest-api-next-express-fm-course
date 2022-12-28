const express = require("express");
const path = require("path");

const app = express();
app.use(express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("src/index.html"));
});

module.exports = app;
