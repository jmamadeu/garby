const routes = require("express").Router();
const AuthController = require("../controllers/AuthController");

routes.post("/authenticate", AuthController.store);
routes.post("/forgot-password", AuthController.show);
routes.post("/reset-password", AuthController.resetPassword);

module.exports = routes;
