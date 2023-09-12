const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));

const weather = require("./router/weather");
app.use("/", weather);

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
