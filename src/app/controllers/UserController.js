const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const response = await User.getAllUsers();

    return res.json(response);
  },

  async store(req, res) {
    const response = await User.createUser(req.body);

    return res
      .status(response.statusCode)
      .json({ ...response, statusCode: undefined });
  }
};
