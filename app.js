//Set enviroment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const PORT = process.env.PORT;

//Packages
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//Middlewares
app.use(express.static(path.join(__dirname, "public"))); //To set the static files (css, js, etc)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set the template engine EJS
app.set("view engine", "ejs");
app.set("views", "views");

//Route to test
app.get("/", (req, res, next) => {
  res.render("main.ejs", {
    pageTitle: "Probando Probando",
  });
});

app.get("/signup", (req, res, next) => {
  res.render("signup.ejs", {
    pageTitle: "Sign Up",
  });
});

//Listen in .env.PORT
app.listen(PORT, () => {
  console.log(`Listening in port: ${PORT}`);
});
