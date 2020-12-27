if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening in port: ${port}`);
});
