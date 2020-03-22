const ProjectSchema = require("./schemas/ProjectSchema");
const Task = require("./Task");

class Project {
  static async deleteProject(projectId) {
    try {
      const project = await ProjectSchema.findByIdAndDelete(projectId).populate(
        "user"
      );

      if (!project) {
        return {
          errors: ["Projecto inexistente"],
          success: false,
          statusCode: 400
        };
      }

      return {
        success: true,
        data: project,
        message: "Projecto eliminado com êxito!",
        statusCode: 200
      };
    } catch (err) {
      return {
        errors: ["Erro na eliminação do projecto, tente novamente"],
        success: false,
        statusCode: 400
      };
    }
  }

  static async editProject({ title, description, tasks, projectId }) {
    try {
      let project = await ProjectSchema.findByIdAndUpdate(projectId, {
        title,
        description
      }).populate("user");

      if (!project) {
        return {
          errors: ["Projecto existente"],
          success: false,
          statusCode: 400
        };
      }

      project.tasks = [];

      await Task.deleteTask({ project: project._id });

      await Promise.all(
        tasks.map(async task => {
          const projectTask = await Task.createTask({
            ...task,
            project: project._id
          });

          project.tasks.push(projectTask.data);
        })
      );

      await project.save();

      return {
        data: project,
        success: true,
        statusCode: 200
      };
    } catch (err) {
      return {
        errors: ["Erro na edição do projecto, tente novamente!"],
        success: false,
        statusCode: 400
      };
    }
  }

  static async createProject({ title, description, tasks, user }) {
    try {
      let project = await ProjectSchema.findOne({
        title,
        description
      }).populate("user");

      if (!project) {
        project = await ProjectSchema.create({
          title,
          description,
          user
        });

        await Promise.all(
          tasks.map(async task => {
            const projectTask = await Task.createTask({
              ...task,
              project: project._id
            });

            project.tasks.push(projectTask.data);
          })
        );

        await project.save();

        return {
          data: project,
          success: true,
          message: `O projecto, ${project.title} foi criado com êxito!`,
          statusCode: 200
        };
      }

      return {
        errors: ["Projecto existente"],
        success: false,
        data: project,
        statusCode: 400
      };
    } catch (err) {
      return {
        errors: ["Erro na criação do projecto, tente novamente!"],
        success: false,
        statusCode: 400
      };
    }
  }

  static async getProjectById(projectId) {
    try {
      const project = await ProjectSchema.findById(projectId)
        .populate("user")
        .populate("tasks");

      if (!project) {
        return {
          errors: ["Projecto inexistente"],
          success: false,
          statusCode: 400
        };
      }

      return {
        statusCode: 200,
        data: project,
        success: true
      };
    } catch (err) {
      return {
        success: false,
        errors: ["Erro ao carregar o projecto"],
        statusCode: 400
      };
    }
  }

  static async getAllProjects() {
    const projects = await ProjectSchema.find()
      .populate("user")
      .populate("tasks");

    return {
      data: projects,
      success: true,
      statusCode: 200
    };
  }
}

module.exports = Project;
