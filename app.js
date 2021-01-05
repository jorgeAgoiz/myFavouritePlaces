//Set enviroment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

//Models
const User = require("./models/user");

//Packages
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

//Import routes
const { authRoute } = require("./routes/auth");
const { adminRoute } = require("./routes/admin");

//Middlewares
app.use(express.static(path.join(__dirname, "public"))); //To set the static files (css, js, etc)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: "myFirstSecretSession",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//Set the template engine EJS
app.set("view engine", "ejs");
app.set("views", "views");

//Set middlewares routes

//Este middleware se ejecutara en cada peticion
app.use((req, res, next) => {
  if (!req.session.user) {
    //Si el session.user no existe pasamos al siguiente middleware
    return next();
  }
  //Pero si existe buscamos el usuario en mongodb
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user; //Y lo seteamos en req.user
      next(); //Pasamos al siguiente middleware
    })
    .catch((err) => {
      console.log(err);
    });
}); //Se ejecutara en cada peticion para volver a pasar el req.user actualizado en cada peticion
app.use(authRoute);
app.use(adminRoute);

//Listen in .env.PORT
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Listening in port: ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

/* Proximos pasos: Investigar como se destruye la session al cerrar el navegador, implementar 
el npm csurf para los tokens y empezar con la API de leafleet  */
