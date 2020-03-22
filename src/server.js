const express = require("express");

const routes = require("./app/routes");

const database = require("./database");

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log("server is running");
});
