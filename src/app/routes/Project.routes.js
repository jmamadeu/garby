const routes = require("express").Router();

const ProjectController = require("../controllers/ProjectController");

const authMiddleware = require("../middlewares/auth");

routes.use(authMiddleware);

routes.get("/", ProjectController.index);
routes.get("/:projectId", ProjectController.show);

routes.post("/", ProjectController.store);

routes.put("/:projectId", ProjectController.update);

routes.delete("/:projectId", ProjectController.delete);

module.exports = routes;
