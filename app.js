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
const mongoose = require("mongoose");
const flash = require("connect-flash");

//Import routes
const { authRoute } = require("./routes/auth");

//Middlewares
app.use(express.static(path.join(__dirname, "public"))); //To set the static files (css, js, etc)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());

//Set the template engine EJS
app.set("view engine", "ejs");
app.set("views", "views");

//Set middlewares routes
app.use(authRoute);

//Listen in .env.PORT
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Listening in port: ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
