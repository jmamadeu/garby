const routes = require("express").Router();

const UserRoutes = require("./User.routes");
const AuthRoutes = require("./Auth.routes");
const ProjectRoutes = require("./Project.routes");

routes.use("/users", UserRoutes);
routes.use("/auth", AuthRoutes);
routes.use("/projects", ProjectRoutes);

module.exports = routes;
