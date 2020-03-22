const Project = require("../models/Project");
const Task = require("../models/Task");

module.exports = {
  async index(req, res) {
    const response = await Project.getAllProjects();

    return res
      .status(response.statusCode)
      .json({ ...response, statusCode: undefined });
  },

  async show(req, res) {
    const response = await Project.getProjectById(req.params.projectId);

    return res
      .status(response.statusCode)
      .json({ ...response, statusCode: undefined });
  },

  async store(req, res) {
    const response = await Project.createProject({
      ...req.body,
      user: req.userId
    });

    return res.status(response.statusCode).json({
      ...response,
      statusCode: undefined
    });
  },

  async update(req, res) {
    const response = await Project.editProject({ ...req.body, ...req.params });

    return res.status(response.statusCode).json({
      ...response,
      statusCode: undefined
    });
  },

  async delete(req, res) {
    const response = await Project.deleteProject(req.params.projectId);

    return res
      .status(response.statusCode)
      .json({ ...response, statusCode: undefined });
  }
};
