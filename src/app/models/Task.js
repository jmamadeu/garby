const TaskSchema = require("./schemas/TaskSchema");

class Task {
  static async createTask(data) {
    try {
      const task = await TaskSchema.create(data);

      return {
        data: task,
        success: true,
        message: "A tarefa foi criada com êxito!"
      };
    } catch (err) {
      return {
        success: false,
        errors: ["Erro ao criar a tarefa, tente novamente"]
      };
    }
  }

  static async deleteTask(conditions) {
    try {
      await TaskSchema.deleteOne(conditions);
    } catch (err) {}
  }
}

module.exports = Task;
