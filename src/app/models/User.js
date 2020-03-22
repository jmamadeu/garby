const UserSchema = require("./schemas/UserSchema");
const token = require("../utils/generateToken");

class User {
  static async getAllUsers() {
    let users = await UserSchema.find();

    return {
      data: users,
      length: users.length,
      success: true
    };
  }

  static async createUser(data) {
    const { name, email } = data;
    try {
      let user = await UserSchema.findOne({
        name,
        email
      });

      if (!user) {
        user = await UserSchema.create(data);

        user.password = undefined;

        return {
          data: user,
          success: true,
          message: `Usuário ${user.name} Cadastrado com êxito!`,
          token: token.generate({ id: user.id }),
          statusCode: 200
        };
      }

      user.password = undefined;

      return {
        data: user,
        success: false,
        errors: ["Usuário existente"],
        statusCode: 400
      };
    } catch (err) {
      data.password = undefined;

      return {
        data: data,
        success: false,
        errors: ["Erro no cadastro do usuário", err],
        statusCode: 400
      };
    }
  }
}

module.exports = User;
