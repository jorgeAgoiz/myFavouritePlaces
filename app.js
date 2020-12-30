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

//Import routes
const { authRoute } = require("./routes/auth");

//Middlewares
app.use(express.static(path.join(__dirname, "public"))); //To set the static files (css, js, etc)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set the template engine EJS
app.set("view engine", "ejs");
app.set("views", "views");

//Set middlewares routes
app.use(authRoute);

//Listen in .env.PORT
app.listen(PORT, () => {
  console.log(`Listening in port: ${PORT}`);
});
