const express = require("express");
const bodyParser = require("body-parse");

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("Hello api is working");
});

app.listen(port, () => {
  console.log(`Server is running on: ${port}`);
});
