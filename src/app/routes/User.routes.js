const routes = require("express").Router();

const UserController = require("../controllers/UserController");

routes.get("/", UserController.index);

routes.post("/", UserController.store);

module.exports = routes;
